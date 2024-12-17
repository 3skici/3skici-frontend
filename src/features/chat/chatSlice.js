import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import socket from "../../utils/socket";

// Thunk to fetch all chats (using REST for initial chat list)
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
        throw new Error(errorData.message || "Failed to fetch chats");
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch chats"
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
      return rejectWithValue("Failed to fetch chat messages");
    }
  }
);

// Initialize Socket.IO listeners
export const initializeSocketListeners = () => (dispatch, getState) => {
  // Handle incoming messages
  socket.on("newMessage", (message) => {
    const state = getState();
    // Only add message if it's for the currently selected chat
    if (state.chats.selectedChatId === message.chatId) {
      dispatch(receiveMessage(message));
    }
    // Optionally update the chat list (e.g., move the chat to the top)
  });

  // Handle typing events
  socket.on("typing", ({ chatId, userId }) => {
    const state = getState();
    if (
      state.chats.selectedChatId === chatId &&
      state.auth.user?._id !== userId
    ) {
      dispatch(setTyping(true));
    }
  });

  socket.on("stopTyping", ({ chatId, userId }) => {
    const state = getState();
    if (
      state.chats.selectedChatId === chatId &&
      state.auth.user?._id !== userId
    ) {
      dispatch(setTyping(false));
    }
  });
};

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    selectedChatId: null,
    selectedChat: { messages: [] },
    loading: false,
    error: null,
    isTyping: false, // Simplified: boolean flag for the other user's typing status
  },
  reducers: {
    selectChat: (state, action) => {
      state.selectedChatId = action.payload;
      state.selectedChat = { messages: [] };
      state.error = null;
      state.isTyping = false;
    },
    clearChat: (state) => {
      state.selectedChatId = null;
      state.selectedChat = { messages: [] };
      state.error = null;
      state.isTyping = false;
    },
    receiveMessage: (state, action) => {
      const message = action.payload;
      state.selectedChat.messages.push(message);
    },
    setTyping: (state, action) => {
      const userId = action.payload;

      state.isTyping = action.payload;
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
        state.error = action.payload;
      })

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
      });
  },
});

export const { selectChat, clearChat, receiveMessage, setTyping } =
  chatSlice.actions;

export default chatSlice.reducer;
