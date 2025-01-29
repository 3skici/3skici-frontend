// src/components/MyChats.js
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, selectChat } from "../../features/chat/chatSlice";
import { format } from "timeago.js";
import { getImageUrl } from "../../utils/imgagesHelper";
const MyChats = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Token from Redux state
  const userId = useSelector((state) => state.auth.user?._id); // Current user's ID
  const { chats, loading } = useSelector((state) => state.chats);

  const [skeletonCount, setSkeletonCount] = useState(3); // Default count
  const [activeChatKey, setActiveChatKey] = useState(null); // Local state to track selected chat
  const [clickTimeout, setClickTimeout] = useState(null); // Timeout state to debounce clicks

  // Determine the number of skeletons based on screen height
  useEffect(() => {
    const calculateSkeletonCount = () => {
      const viewportHeight = window.innerHeight; // Screen height
      const skeletonHeight = 80; // Approximate height of each skeleton component in pixels
      const count = Math.floor(viewportHeight / skeletonHeight); // Calculate number of skeletons
      setSkeletonCount(count);
    };

    calculateSkeletonCount(); // Initial calculation
    window.addEventListener("resize", calculateSkeletonCount); // Recalculate on window resize
    return () => window.removeEventListener("resize", calculateSkeletonCount);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchChats());
    }
  }, [dispatch, token]);

  const handleChatClick = (chatKey) => {
    // Check if the clicked chat is already the active one
    if (activeChatKey === chatKey) {
      setActiveChatKey(null); // Deselect the chat if it's already active
    } else {
      setActiveChatKey(chatKey); // Set the clicked chat as active
      dispatch(selectChat(chatKey)); // Optionally dispatch selectChat if needed
    }
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="relative flex w-full animate-pulse gap-2 p-4 mx-auto">
      <div className="h-12 w-12 rounded-full bg-slate-400"></div>
      <div className="flex-1">
        <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400"></div>
        <div className="h-5 w-[90%] rounded-lg bg-slate-400"></div>
      </div>
      <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
    </div>
  );

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full">
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          // Render Loading Skeletons based on screen height
          Array.from({ length: skeletonCount }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))
        ) : chats && chats.length > 0 ? (
          chats.map((conversation) => {
            // Identify the recipient (other participant)
            const recipient = conversation.participants.find(
              (user) => user._id !== userId
            );
            // Determine the display name
            const displayName = recipient ? recipient.username : "Unknown User";
            const userPic = recipient ? (
              recipient.avatar
            ) : (
              <FaUser className="text-white text-xl" />
            );
            // Access the last message content and timestamp
            const lastMessageContent =
              conversation.lastMessage?.content || "No message yet";
            const lastMessageTimestamp = conversation.lastMessage
              ? format(conversation.lastMessage.createdAt)
              : "";

            return (
              <div
                key={conversation.chatKey}
                onClick={() => handleChatClick(conversation.chatKey)}
                className={`flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50 cursor-pointer transition duration-200 ease-in-out ${
                  activeChatKey === conversation.chatKey ? "bg-blue-100" : ""
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Open chat with ${displayName}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <img
                      src={getImageUrl(userPic)}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-gray-800">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">
                      {lastMessageContent}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  <p className="text-xs text-gray-500 truncate max-w-xs">
                    {lastMessageTimestamp}
                  </p>
                  {conversation.status && (
                    <span
                      className={`ml-2 text-xs rounded-full px-2 py-1 ${
                        conversation.status === "sent"
                          ? "bg-gray-500 text-white"
                          : conversation.status === "delivered"
                          ? "bg-blue-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {conversation.status}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center py-10">
            You do not have any chat.
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
