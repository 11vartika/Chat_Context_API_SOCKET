
import React from "react";
import ChatComponent from "../components/chatComponent";
import { ChatState } from "../context/chatProvider";

const ChatPage = () => {
  
const {user}=  ChatState();
  return (
    <div>
      <ChatComponent user={user}/>
    </div>
  );
};

export default ChatPage;
