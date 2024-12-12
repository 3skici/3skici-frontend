// src/pages/ChatPage.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const token = useSelector((state) => state.auth.token);
  const [chats, setChats] = useState([]);

  // fetch all user chats
  useEffect(() => {
    const fetchConversations = async () => {
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
          throw new Error("Failed to fetch conversations");
        }

        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (token) {
      fetchConversations();
    } else {
      console.error("No token available");
    }
  }, [token]);

  return (
    <div className="flex flex-col max-w-md w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white py-4 px-6 text-lg font-semibold">
        Messages
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats && chats.length > 0 ? (
          chats.map((conversation) => (
            <div
              key={conversation._id}
              // onClick={() => handleSelectConversation(conversation._id)}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={conversation.userAvatar || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {conversation.participants
                      .map((user) => user.username)
                      .join(", ")}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {conversation.lastMessage
                      ? conversation.lastMessage.text
                      : "No message yet"}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                <p className="text-xs text-gray-500 truncate">
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
    </div>
  );
};

export default ChatPage;
