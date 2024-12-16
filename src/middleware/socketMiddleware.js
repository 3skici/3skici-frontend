// src/middleware/socketMiddleware.js
import { receiveMessage } from "../features/chat/chatSlice";
import socket from "../utils/socket";

const socketMiddleware = (storeAPI) => {
  // Listen for incoming messages
  socket.on("newMessage", (message) => {
    const state = storeAPI.getState();
    if (state.chats.selectedChatId === message.chatId) {
      storeAPI.dispatch(receiveMessage(message));
    }
    // Optionally handle other events like user typing, user joined, etc.
  });

  return (next) => (action) => {
    return next(action);
  };
};

export default socketMiddleware;
