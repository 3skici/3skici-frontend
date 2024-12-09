// src/pages/ChatPage.js
import React, { useEffect, useState } from 'react';
import ConversationList from './ConversationList';

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const data = await fetchConversations();
//       setConversations(data);
//     })();
//   }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left sidebar with conversation list */}
      <div style={{ width: '300px', borderRight: '1px solid #ccc' }}>
        <ConversationList conversations={conversations} />
      </div>
      {/* Main area will be a router outlet for ConversationPage */}
      <div style={{ flex: 1 }}>
        {/* Here you can have <Outlet /> if using React Router v6 
            which will render ConversationPage when a conversation is selected.
        */}
      </div>
    </div>
  );
}

export default ChatPage;
