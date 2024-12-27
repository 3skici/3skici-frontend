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
  async (chatKey, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/message/${chatKey}`,
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
      const data = await response.json();

      // Ensure product is included in each message
      return data.map((message) => ({
        ...message,
        product: message.product || null,
      }));
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
    if (state.chats.selectedChatKey === message.chatKey) {
      dispatch(receiveMessage(message));
    }
    // Optionally update the chat list (e.g., move the chat to the top)
  });

  // Handle typing events
  socket.on("typing", ({ chatKey, userId }) => {
    const state = getState();
    if (
      state.chats.selectedChatKey === chatKey &&
      state.auth.user?._id !== userId
    ) {
      dispatch(setTyping(true));
    }
  });

  socket.on("stopTyping", ({ chatKey, userId }) => {
    const state = getState();
    if (
      state.chats.selectedChatKey === chatKey &&
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
    selectedChatKey: null,
    selectedChat: { messages: [] },
    loading: false,
    error: null,
    isTyping: false, // Simplified: boolean flag for the other user's typing status
  },
  reducers: {
    selectChat: (state, action) => {
      state.selectedChatKey = action.payload;
      state.selectedChat = { messages: [] };
      state.error = null;
      state.isTyping = false;
    },
    clearChat: (state) => {
      state.selectedChatKey = null;
      state.selectedChat = { messages: [] };
      state.error = null;
      state.isTyping = false;
    },
    receiveMessage: (state, action) => {
      const message = action.payload;

      // Add the message to the selected chat
      if (state.selectedChatKey === message.chatKey) {
        state.selectedChat.messages.push(message);
      }

      // Update the chat list to move this chat to the top
      state.chats = state.chats.map((chat) =>
        chat.chatKey === message.chatKey
          ? {
              ...chat,
              updatedAt: new Date(),
              products: Array.from(
                new Set([...(chat.products || []), message.product?._id])
              ),
            }
          : chat
      );
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    addOrUpdateChat: (state, action) => {
      const newChat = action.payload;
      const index = state.chats.findIndex((c) => c.chatKey === newChat.chatKey);
      if (index === -1) {
        state.chats.push(newChat);
      } else {
        state.chats[index] = { ...state.chats[index], ...newChat };
      }
    },
    setChatMessages: (state, action) => {
      const { chatKey, messages } = action.payload;
      if (state.selectedChatKey === chatKey) {
        state.selectedChat.messages = messages;
      }
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

export const {
  selectChat,
  clearChat,
  receiveMessage,
  setTyping,
  addOrUpdateChat,
  setChatMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
