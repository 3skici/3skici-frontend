// src/utils/socket.js
import { io } from "socket.io-client";
// import { store } from "../redux/store";
import { receiveMessage } from "../features/chat/chatSlice";
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

// Listen for connection errors
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

export default socket;
