import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  // Get the logged-in user's details from the Redux store
  const { user } = useSelector((state) => state.auth);
  const buyerId = user?._id; // The logged-in user (buyer)
  const { productId, sellerId } = useParams(); // Get product and seller ids from route params
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Effect to fetch or create a conversation and fetch messages for it
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        // Create or fetch the conversation between buyer and seller
        const response = await fetch(`${process.env.REACT_APP_API_URL}/conversation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            participants: [sellerId, buyerId], // Use dynamic buyerId here
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create or fetch conversation");
        }

        const data = await response.json();
        setConversationId(data._id); // Set the conversation ID

        // Fetch the messages for this conversation
        const messagesResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/message/${data._id}`
        );
        const messagesData = await messagesResponse.json();
        setMessages(messagesData); // Set the messages to display in the UI
      } catch (error) {
        console.error("Error fetching or creating conversation:", error);
      }
    };

    if (buyerId && sellerId) {
      fetchConversation(); // Only fetch if buyerId and sellerId are available
    }
  }, [productId, sellerId, buyerId]); // Effect depends on productId, sellerId, and buyerId

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() && conversationId) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationId,
            senderId: buyerId, // Use the actual buyerId here
            content: newMessage,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const messageData = await response.json();

        // Update the message list with the new message
        setMessages((prevMessages) => [...prevMessages, messageData]);

        // Clear the input field
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Chat with Seller: {sellerId}</h2>

      <div className="flex flex-col space-y-4 h-96 overflow-auto p-4 bg-gray-50 rounded-lg mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.senderId === buyerId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.senderId === buyerId ? "bg-green-200" : "bg-blue-200"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
