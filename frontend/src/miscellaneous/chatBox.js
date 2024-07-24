import React from 'react'
import { useChat } from '../context/chatProvider'
import { Box } from '@chakra-ui/react';
import SingleChat from '../components/singleChat';
const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = useChat();
  return (
    <Box
    d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
<SingleChat setFetchAgain={setFetchAgain}  fetchAgain={fetchAgain}/>
    </Box>
  )
}

export default ChatBox