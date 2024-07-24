import React, { useState } from "react";
import SideDrawer from "../miscellaneous/sideDrawer";
import { Box } from "@chakra-ui/react";
import MyChat from "../miscellaneous/myChat";
import ChatBox from "../miscellaneous/chatBox";

const ChatComponent = ({ user }) => {
  const[fetchAgain,setFetchAgain]=useState(false)
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {user && <SideDrawer  />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && <ChatBox  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default ChatComponent;
