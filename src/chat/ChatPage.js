// src/components/ChatPage.js
import React from "react";
import MyChats from "./MyChats";
import ChatRoom from "./ChatRoom";

const ChatPage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* MyChats Component */}
      <div className="lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
        <MyChats /> {/* MyChats will now directly manage the selectedChatId */}
      </div>

      {/* ChatRoom Component */}
      <div className="lg:w-2/3 bg-white shadow-lg rounded-lg overflow-hidden">
        <ChatRoom /> {/* ChatRoom will directly get the chatId from Redux */}
      </div>
    </div>
  );
};

export default ChatPage;
