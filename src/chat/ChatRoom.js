import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js"; // Importing the format function from timeago.js
import {
  fetchChatContent,
  selectChat,
  sendMessage,
} from "../features/chat/chatSlice"; // Import sendMessage action

const ChatRoom = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Fetch token from Redux state
  const userId = useSelector((state) => state.auth.userId); // Fetch current user ID from Redux state
  const { selectedChatId, selectedChat, loading, error } = useSelector(
    (state) => state.chats
  );

  const [newMessage, setNewMessage] = useState(""); // Track new message input

  useEffect(() => {
    if (selectedChatId && token) {
      dispatch(fetchChatContent(selectedChatId)); // Fetch messages when chatId changes
    }
  }, [dispatch, selectedChatId, token]);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      dispatch(
        sendMessage({ chatId: selectedChatId, message: newMessage, token })
      );
      setNewMessage("");
    }
  }, [dispatch, newMessage, selectedChatId, token]);

  console.log("selectedChat messages", selectedChat.messages);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden h-[80vh]">
      <div className="bg-blue-600 text-white py-4 px-6 rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat Room</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-100 space-y-4">
        {loading && (
          <p className="text-center text-gray-600">Loading chat content...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Correctly access selectedChat.messages */}
        {selectedChat &&
        selectedChat.messages &&
        selectedChat.messages.length > 0 ? (
          selectedChat.messages.map((message) => (
            <div
              key={message._id} // Use message._id for unique key
              className={`flex ${
                message.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 rounded-lg max-w-xs text-sm ${
                  message.senderId === userId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                <div>{message.content}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {format(message.timestamp)}{" "}
                  {/* Format timestamp with timeago.js */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-10">
            Select a chat to view messages
          </div>
        )}
      </div>

      {/* Send Message Input */}
      <div className="border-t py-4 px-6 flex items-center space-x-4 bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
