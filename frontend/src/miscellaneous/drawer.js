import React,{useState} from "react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    useToast,
    Spinner,
} from "@chakra-ui/react";

import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "../components/chatLoading";
import UserListItem from "../components/userList";
import { ChatState } from "../context/chatProvider";
const DrawerComponent = ({
    isOpen,
    onOpen,
    onClose,
    search,
    handleChange,
    setLoading,
    setSearchResult,
    user,
    loading,
    searchResult
}) => {
    const toast = useToast();
     const [loadingChat, setLoadingChat] = useState(false);
    const { setSelectedChat, chats, setChats } = ChatState();
    const btnRef = React.useRef();
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (err) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };
    const accessChat = async (userId) => {
        console.log(userId);
    
        try {
          setLoadingChat(true);
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(`/api/chat`, { userId }, config);
    
          if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
          setSelectedChat(data);
          setLoadingChat(false);
          onClose();
        } catch (error) {
          toast({
            title: "Error fetching the chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      };
    
    
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

                    <DrawerBody>
                        <Box>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={handleChange}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (<ChatLoading />) : (

                            searchResult?.map((i) => <UserListItem key={i._id} user={i} handleFunction={() => accessChat(i._id)} />)

                        )}
                          {loadingChat && <Spinner ml="auto" display="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default DrawerComponent;
