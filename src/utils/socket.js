// src/utils/socket.js
import { io } from "socket.io-client";
// import { store } from "../redux/store";
import { receiveMessage, setTyping } from "../features/chat/chatSlice";

// Replace with your actual server URL
const SOCKET_SERVER_URL =
  process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:3000";

// Initialize Socket.IO client
const socket = io(SOCKET_SERVER_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
  transports: ["websocket"],
});

// Initialize Socket Events
export const setupSocketListeners = (dispatch) => {
  socket.on("connect", () => console.log("Connected to socket server."));

  socket.on("newMessage", (message) => {
    dispatch(receiveMessage(message));
  });

  socket.on("typing", ({ chatId, userId }) => {
    dispatch(setTyping({ chatId, userId, typing: true }));
  });

  socket.on("stopTyping", ({ chatId, userId }) => {
    dispatch(setTyping({ chatId, userId, typing: false }));
  });

  socket.on("errorMessage", (error) => console.error("Socket Error:", error));
};

export default socket;
