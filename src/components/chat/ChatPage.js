// src/components/ChatPage.js
import React, { useEffect } from "react";
import MyChats from "./MyChats";
import ChatRoom from "./ChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, selectChat } from "../../features/chat/chatSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { chats, selectedChatId } = useSelector((state) => state.chats);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token && chats.length === 0) {
      dispatch(fetchChats());
    }
  }, [dispatch, token, chats.length]);

  // When selectedChatId changes, ensure we fetch the correct chat
  useEffect(() => {
    if (selectedChatId) {
      // Fetch the selected chat's content
      dispatch(selectChat(selectedChatId));
    }
  }, [selectedChatId, dispatch]);
  return (
    <div className="flex flex-col lg:flex-row mt-28">
      {/* MyChats Component */}
      <div className="lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
        <MyChats />
      </div>

      {/* ChatRoom Component */}
      <div className="lg:w-2/3 bg-white shadow-lg rounded-lg overflow-hidden">
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatPage;
