import React, { useState, useEffect } from "react";
import { ChatState } from "../context/chatProvider";
import { Box, useToast, Stack, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "../components/chatLoading";
import { getSender } from "../config/chatLogic";
import { AddIcon } from "@chakra-ui/icons";
import GroupChatModal from "./groupChatModal";

const MyChat = ({fetchAgain}) => {
  const { setSelectedChat, chats, setChats, user, selectedChat } = ChatState();
 
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchData();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "38%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal fetchData={fetchData}>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((i) => (
              <Box
                onClick={() => setSelectedChat(i)}
                cursor="pointer"
                bg={selectedChat === i ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === i ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={i._id}
              >
                <Text>
                  {!i.isGroupChat
                    ? getSender(loggedUser, i.users)
                    : i.chatName}
                </Text>
                {i.latestMessage && (
                  <Text fontSize="xs">
                    <b>{i.latestMessage.sender.name} : </b>
                    {i.latestMessage.content.length > 50
                      ? i.latestMessage.content.substring(0, 51) + "..."
                      : i.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
