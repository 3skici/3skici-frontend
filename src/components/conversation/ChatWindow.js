import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const ChatWindow = ({ userId, recipientId, conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Join the user's room for private messaging
    socket.emit('joinRoom', userId);

    // Fetch existing messages for the conversation
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/${conversationId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for new messages from Socket.IO
    socket.on('receiveMessage', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [conversationId, userId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId,
      senderId: userId,
      recipientId, // Used to send the message to the correct user via Socket.IO
      content: newMessage,
    };

    try {
      // Send the message to the server via Socket.IO
      socket.emit('sendMessage', messageData);

      // Update the UI immediately
      setMessages([...messages, { senderId: userId, content: newMessage, timestamp: new Date() }]);
      setNewMessage('');

      // Optionally, save the message to the database via API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-window w-full max-w-md border border-gray-300 rounded-lg p-4 flex flex-col">
      <div className="messages-container flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-2 rounded-lg mb-2 ${msg.senderId === userId ? 'bg-green-200 self-end' : 'bg-gray-200 self-start'}`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="input-container flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg p-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
