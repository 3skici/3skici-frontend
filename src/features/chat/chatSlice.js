// src/features/chat/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import socket from "../../utils/socket"; // Import the Socket.IO client

// Thunk to send a new message
export const sendMessage = createAsyncThunk(
  "chats/sendMessage",
  async ({ chatId, message, token }, { getState, rejectWithValue }) => {
    const { user } = getState().auth; // Get the sender's user info (senderId) from Redux state

    if (!user || !user._id) {
      throw new Error("User ID is missing");
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/message/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use Bearer token here
          },
          body: JSON.stringify({
            chatId: chatId, // Pass chatId
            senderId: user._id, // Pass senderId from Redux user state
            content: message, // Pass message content
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      return data; // Return the new message directly
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Faild to send message"
      );
    }
  }
);

// Thunk to fetch all chats
export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/chat/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Field to fetch chats"
      );
    }
  }
);

// Thunk to fetch specific chat content (messages)
export const fetchChatContent = createAsyncThunk(
  "chats/fetchChatContent",
  async (chatId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/message/${chatId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chat messages");
      }

      return response.json();
    } catch (error) {
      return rejectWithValue("Field to fetch chat messages");
    }
  }
);

// Thunk to initialize Socket.IO listeners
export const initializeSocketListeners = () => (dispatch, getState) => {
  // Listen for incoming messages
  socket.on("newMessage", (message) => {
    // Optionally, filter messages based on the selected chat
    const state = getState();
    if (state.chats.selectedChatId === message.chatId) {
      dispatch(receiveMessage(message));
      // You might also want to update the chats list if necessary
      // For example, updating the last message or sorting chats
    }
    // Listen for other Socket.IO events if necessary
    // e.g., user typing, user joined, etc.
  });
};

// slice
const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    selectedChatId: null,
    selectedChat: { messages: [] }, // Ensure messages array exists
    loading: false,
    error: null,
  },
  reducers: {
    selectChat: (state, action) => {
      state.selectedChatId = action.payload;
      state.selectedChat = { messages: [] };
      state.error = null;
    },
    clearChat: (state) => {
      state.selectedChatId = null;
      state.selectedChat = { messages: [] };
      state.error = null;
    },
    receiveMessage: (state, action) => {
      const message = action.payload;
      state.selectedChat.messages.push(message);
      // Optionally, update the chats list to move the chat to the top or update last message
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch chats
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchChatContent
      .addCase(fetchChatContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatContent.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedChat = { messages: action.payload };
      })
      .addCase(fetchChatContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle sendMessage
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedChat && state.selectedChat.messages) {
          state.selectedChat.messages.push(action.payload);
        } else {
          state.selectedChat = { messages: [action.payload] };
        }

        // Optionally, update the chats list to reflect the new message
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectChat, clearChat, receiveMessage } = chatSlice.actions;

export default chatSlice.reducer;
