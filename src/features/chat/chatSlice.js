// src/features/chat/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to send a new message
export const sendMessage = createAsyncThunk(
  "chats/sendMessage",
  async ({ chatId, message, token }, { getState }) => {
    const { user } = getState().auth; // Get the sender's user info (senderId) from Redux state

    if (!user || !user._id) {
      throw new Error("User ID is missing");
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/message/`, {
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
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();

    return data; // Return the new message directly
  }
);

// Thunk to fetch all chats
export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (_, { getState }) => {
    const { token } = getState().auth;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send message");
    }

    return response.json();
  }
);

// Thunk to fetch specific chat content (messages)
export const fetchChatContent = createAsyncThunk(
  "chats/fetchChatContent",
  async (chatId, { getState }) => {
    const { token } = getState().auth;
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
  }
);

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
    },
    clearChat: (state) => {
      state.selectedChatId = null;
      state.selectedChat = { messages: [] }; // Reset messages when clearing the chat
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchChatContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatContent.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedChat = { messages: action.payload };
      })
      .addCase(fetchChatContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle sendMessage
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedChat && state.selectedChat.messages) {
          state.selectedChat.messages = [
            ...state.selectedChat.messages,
            action.payload,
          ];
        } else {
          state.selectedChat = { messages: [action.payload] };
        }
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectChat, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
