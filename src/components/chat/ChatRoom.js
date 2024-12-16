import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import {
  fetchChatContent,
  initializeSocketListeners,
  sendMessage,
} from "../../features/chat/chatSlice";
import socket from "../../utils/socket";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?._id);

  const { selectedChatId, selectedChat, loading, error } = useSelector(
    (state) => state.chats
  );

  const [newMessage, setNewMessage] = useState("");

  const chatContainerRef = useRef(null); // Ref for the scrollable chat container

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Initialize Socket.IO listeners once the component mounts
  useEffect(() => {
    dispatch(initializeSocketListeners());

    // Cleanup on unmount
    return () => {
      // Optionally, remove all listeners
      socket.off("newMessage");
    };
  }, [dispatch]);

  // Fetch chat content when selectedChatId or token changes
  useEffect(() => {
    if (selectedChatId && token) {
      dispatch(fetchChatContent(selectedChatId));

      // Join the conversation room via Socket.IO
      socket.emit("joinChat", selectedChatId);
    }

    // Cleanup: Leaving the conversation room when component unmounts or selectedChatId change
    return () => {
      if (selectedChatId) {
        socket.emit("leaveChat", selectedChatId);
      }
    };
  }, [dispatch, selectedChatId, token]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (
      selectedChat &&
      selectedChat.messages &&
      selectedChat.messages.length > 0
    ) {
      scrollToBottom();
    }
  }, [selectedChat]);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() && selectedChatId) {
      // Prepare the message data
      const messageData = {
        chatId: selectedChatId,
        content: newMessage,
      };

      // Emit the 'sendMessage' event via Sock.IO
      socket.emit("sendMessage", messageData);

      dispatch(
        sendMessage({ chatId: selectedChatId, message: newMessage, token })
      );
      setNewMessage("");
    }
  }, [dispatch, newMessage, selectedChatId, token]);

  // Sort messages by timestamp
  const sortedMessages = selectedChat?.messages
    ? selectedChat.messages
        .slice()
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    : [];

  // Group messages by date
  const groupedMessages = sortedMessages.reduce((groups, message) => {
    const dateKey = new Date(message.timestamp).toLocaleDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {});

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden h-[80vh]">
      <div className="bg-blue-600 text-white py-4 px-6 rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat Room</h2>
      </div>
      <div
        ref={chatContainerRef} // Attach ref to the scrollable container
        className="flex-1 overflow-y-auto px-4 py-6 bg-gray-100 space-y-4"
      >
        {loading && (
          <p className="text-center text-gray-600">Loading chat content...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {Object.keys(groupedMessages).length > 0 ? (
          Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="mb-6">
              <div className="text-center text-gray-500 my-4">{date}</div>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex mb-4 ${
                      message.senderId === userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-lg max-w-xs text-sm shadow ${
                        message.senderId === userId
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-300 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <div>{message.content}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {format(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-10">
            Select a chat to view messages
          </div>
        )}
      </div>

      {/* Input Field and Send Button - Only Rendered When a Chat is Selected */}
      {selectedChatId && (
        <div className="border-t py-4 px-6 flex items-center space-x-4 bg-white">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            disabled={loading} // Optionally disable input while loading
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            disabled={loading || !newMessage.trim()} // Optionally disable button while loading or input is empty
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
