import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import {
  fetchChatContent,
  initializeSocketListeners,
} from "../../features/chat/chatSlice";
import socket from "../../utils/socket";
import { getImageUrl } from "../../utils/imgagesHelper";

const TYPING_INTERVAL = 3000; // in ms - how long after user stops typing to emit stopTyping

const ChatRoom = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?._id);

  const { selectedChatKey, selectedChat, loading, error, isTyping } =
    useSelector((state) => state.chats);
  const [newMessage, setNewMessage] = useState("");
  const [typingTimeoutId, setTypingTimeoutId] = useState(null);
  const chatContainerRef = useRef(null);
  // local message cache
  const [optimisticMessages, setOptimisticMessages] = useState([]);

  // 1) Fetch chat content by chatKey when it changes
  useEffect(() => {
    if (selectedChatKey && token) {
      // fetchChatContent now expects chatKey instead of an _id
      dispatch(fetchChatContent(selectedChatKey));

      // Join the conversation room via Socket.IO using chatKey
      socket.emit("joinChat", selectedChatKey);
    }

    return () => {
      if (selectedChatKey) {
        socket.emit("leaveChat", selectedChatKey);
      }
    };
  }, [dispatch, selectedChatKey, token]);

  // 2) Initialize Socket.IO listeners once
  useEffect(() => {
    dispatch(initializeSocketListeners());

    return () => {
      socket.off("newMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [dispatch]);

  // 3) Scroll to bottom whenever messages change
  useEffect(() => {
    if (selectedChat?.messages?.length > 0) {
      scrollToBottom();
    }
  }, [selectedChat]);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // local msg cache
  useEffect(() => {
    if (selectedChat?.messages) {
      setOptimisticMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  // 4) Handle sending a message
  const handleSendMessage = useCallback(() => {
    const tempMessage = {
      _id: Date.now().toString(),
      content: newMessage,
      senderId: userId,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    setOptimisticMessages((prev) => [...prev, tempMessage]);

    if (newMessage.trim() && selectedChatKey) {
      // build message data
      const messageData = {
        chatKey: selectedChatKey,
        content: newMessage,
      };

      // Include productId if available in the selected chat's messages
      const product = selectedChat.messages?.[0]?.product;
      if (product?._id) {
        messageData.productId = product._id;
      }

      // Emit the 'sendMessage' event via Socket.IO only
      socket.emit("sendMessage", messageData);

      // Stop typing since user just sent a message
      socket.emit("stopTyping", { chatKey: selectedChatKey, userId });

      setNewMessage("");
    }
  }, [newMessage, selectedChatKey, userId, selectedChat]);

  // Handle typing indicator logic
  const handleTyping = (text) => {
    setNewMessage(text);

    if (!selectedChatKey) return;
    // Emit "typing"
    socket.emit("typing", { chatKey: selectedChatKey, userId });

    // Clear previous timeout if any
    if (typingTimeoutId) clearTimeout(typingTimeoutId);

    // Set a new timeout to emit "stopTyping" if no activity
    const timeoutId = setTimeout(() => {
      socket.emit("stopTyping", { chatKey: selectedChatKey, userId });
    }, TYPING_INTERVAL);

    setTypingTimeoutId(timeoutId);
  };

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error); // Display the error as a toast notification
    }
  }, [error]);

  //Memoize msg calculation
  const sortedMessages = useMemo(
    () =>
      selectedChat?.messages
        ?.slice()
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt) || []),
    [selectedChat?.messages]
  );

  // Group messages by date
  const groupedMessages = useMemo(
    () =>
      sortedMessages.reduce((groups, message) => {
        const dateKey = new Date(message.createdAt).toLocaleDateString();
        groups[dateKey] = [...(groups[dateKey] || []), message];
        return groups;
      }, {}),
    [sortedMessages]
  );

  let lastProductId = null;

  return (
    <div className="flex flex-col bg-gray-100 shadow-lg rounded-lg overflow-hidden h-[80vh]">
      <div className="bg-[#7e193e] text-white py-4 px-6 rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat Room</h2>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 bg-gray-100 space-y-4"
      >
        {/* Better skeleton loading */}
        {loading && (
          <div className="space-y-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-300 h-8 w-8"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {Object.keys(groupedMessages).length > 0 ? (
          Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="mb-6">
              {/* Date Separator */}
              <div className="sticky top-2 z-10 flex justify-center my-4">
                <div className="bg-gray-100 text-gray-500 py-1 px-4 rounded-full text-xs font-medium shadow-sm">
                  {format(date)}
                </div>
              </div>

              <div className="space-y-2">
                {/* Keep track of the last displayed product */}
                {messages.map((message, idx) => {
                  // Check for senderId before rendering the message
                  const isCurrentUser = message.senderId?._id === userId;
                  const senderName = message.senderId?.name || "Unknown User";
                  // Check if this is the first occurrence of the product
                  const shouldDisplayProduct =
                    message.product && message.product._id !== lastProductId;

                  // Update lastProductId if a new product is displayed
                  if (shouldDisplayProduct) {
                    lastProductId = message.product._id;
                  }
                  return (
                    <div key={message._id}>
                      {/* Render Product Info if it's a new product */}
                      {shouldDisplayProduct && (
                        <div className="p-4  rounded-md mb-4">
                          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
                            <div className="flex gap-4 mb-4">
                              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                {message.product.images?.[0] && (
                                  <img
                                    src={getImageUrl(message.product.images[0])}
                                    alt={message.product.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 truncate">
                                  {message.product.name}
                                </h3>

                                {/* Price */}
                                <p className="text-lg font-medium text-red-600 mt-1">
                                  {message.product.price.amount}{" "}
                                  {message.product.price.currency}
                                </p>
                                <p className="text-lg font-medium text-gray-600 mt-1">
                                  {message.product.customId}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Render the Message */}
                      <div
                        key={message._id}
                        className={`relative flex mb-4 ${
                          isCurrentUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl max-w-xs text-sm ${
                            isCurrentUser
                              ? "bg-sky-200 text-black rounded-br-none"
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          <div className="text-sm break-words">
                            {message.content}
                          </div>
                          <div className="text-xs text-gray-500 mt-2 text-right">
                            {format(message.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }, null)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-gray-400 text-center">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm mt-2">Select Exist conversation!</p>
            </div>
          </div>
        )}
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="px-4 pb-2">
          <div className="flex items-center text-sm text-gray-500">
            <div className="flex space-x-1 mr-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <span>typing...</span>
          </div>
        </div>
      )}

      {/* Input Field and Send Button - Only Rendered When a Chat is Selected */}
      {selectedChatKey && (
        <div className="flex flex-row items-center h-16 rounded-xl bg-gray-00 w-full px-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            className="flex-1 p-2 h-10 rounded-lg border rounded-xl border-gray-300 focus:outline-none focus:border-indigo-300 pl-4 mr-4"
            placeholder="Type a message..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            disabled={loading}
          />

          <button
            onClick={handleSendMessage}
            disabled={loading || !newMessage.trim()}
            className="flex items-center justify-center bg-[#7e193e] hover:bg-[#ae2859] rounded-xl text-white px-4 py-1 flex-shrink-0"
          >
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
