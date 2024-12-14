// src/components/MyChats.js
import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, selectChat } from "../features/chat/chatSlice";

const MyChats = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Token from Redux state
  const { chats, loading } = useSelector((state) => state.chats); // Access Redux chat state

  useEffect(() => {
    if (token) {
      dispatch(fetchChats()); // Dispatch to fetch chats, token is already in the Redux state
    }
  }, [dispatch, token]);

  const handleChatClick = (chatId) => {
    dispatch(selectChat(chatId)); // Dispatch to select a chat directly
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto">
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading && <p>Loading...</p>}
        {chats && chats.length > 0 ? (
          chats.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => handleChatClick(conversation._id)} // Set the selected chat ID
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer transition duration-200 ease-in-out"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  {conversation.userAvatar ? (
                    <img
                      src={conversation.userAvatar}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-white text-xl" /> // Default user icon
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-800">
                    {conversation.participants
                      .map((user) => user.username)
                      .join(", ")}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">
                    {conversation.lastMessage
                      ? conversation.lastMessage.text
                      : "No message yet"}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                <p className="text-xs text-gray-500 truncate max-w-xs">
                  {conversation.lastMessage?.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-10">
            No messages yet.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t py-4 px-6 text-center text-gray-500">
        <p className="text-xs">
          You can start a conversation by clicking the button above.
        </p>
      </div>
    </div>
  );
};

export default MyChats;
