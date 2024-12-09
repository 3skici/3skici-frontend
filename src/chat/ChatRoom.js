import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdDoneAll } from 'react-icons/md';
import { FaPaperPlane } from 'react-icons/fa';

const MessageBubble = ({ content, time, status, isSender }) => {
  const bubbleClasses = isSender
    ? 'bg-blue-500 text-white self-end'
    : 'bg-gray-300 text-gray-800 self-start';

  const renderStatusIcon = () => {
    switch (status) {
      case 'delivered':
        // Double check icon for delivered
        return <MdDoneAll className="inline-block h-4 w-4 text-white" />;
      case 'read':
        // Double check icon for read, different color for emphasis
        return <MdDoneAll className="inline-block h-4 w-4 text-green-300" />;
      case 'sent':
      default:
        // Single check icon for sent
        return <MdCheck className="inline-block h-4 w-4 text-white" />;
    }
  };

  return (
    <div className={`flex flex-col max-w-xs p-3 rounded-lg shadow-md text-sm ${bubbleClasses}`}>
      <p className="whitespace-pre-wrap break-words">{content}</p>
      <div className="flex items-center justify-between text-xs mt-1 opacity-75">
        <span>{time}</span>
        <span className="flex items-center space-x-1">
          {renderStatusIcon()}
        </span>
      </div>
    </div>
  );
};

MessageBubble.propTypes = {
  content: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['sent', 'delivered', 'read']).isRequired,
  isSender: PropTypes.bool.isRequired,
};

const ChatRoom = ({ recipientName, messages }) => {
  const handleSend = () => {
    // Implement your sending logic
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white shadow-md">
        <div className="flex items-center space-x-3">
          {/* Placeholder avatar */}
          <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
            {recipientName.charAt(0)}
          </div>
          <h1 className="text-lg font-semibold truncate">Chat with {recipientName}</h1>
        </div>
        {/* Optional: Add a menu or status indicator here */}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
            key={index}
          >
            <MessageBubble
              content={msg.content}
              time={msg.time}
              status={msg.status}
              isSender={msg.isSender}
            />
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center px-4 py-3 bg-white shadow-md">
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 p-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
        >
          <FaPaperPlane className="h-5 w-5 transform rotate-45" />
        </button>
      </div>
    </div>
  );
};

// Example Usage
const Example = () => {
  const messages = [
    { content: 'Hello!', time: '10:00 AM', status: 'read', isSender: false },
    { content: 'Hi there!', time: '10:01 AM', status: 'delivered', isSender: true },
    { content: 'How are you?', time: '10:02 AM', status: 'sent', isSender: true },
  ];

  return <ChatRoom recipientName="John Doe" messages={messages} />;
};

export default Example;
