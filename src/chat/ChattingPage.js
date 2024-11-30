import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { chatId } = useParams(); // Assuming you are passing chatId from URL
  const [messages, setMessages] = useState([
    { sender: 'seller', text: 'Hello! How can I help you today?' },
    { sender: 'buyer', text: 'I’m interested in the item you listed.' },
    { sender: 'seller', text: 'Hello! How can I help you today?' },
    { sender: 'buyer', text: 'I’m interested in the item you listed.' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Send message handler
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // Do not send empty messages
    setMessages([...messages, { sender: 'buyer', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-lg font-semibold">Chat with Seller</h2>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'seller' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm ${
                message.sender === 'seller'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Area */}
      <div className="bg-white p-4 flex items-center space-x-4 border-t border-gray-200">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
