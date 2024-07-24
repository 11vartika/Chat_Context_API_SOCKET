import React, { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
 
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/chatProvider";
import ProfileModal from "./profileModal";
import { useNavigate } from "react-router-dom";
import DrawerComponent from "./drawer";
import { useDisclosure } from "@chakra-ui/react";
import { getSender } from "../config/chatLogic";
import Badge from "../components/badge";
const SideDrawer = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, notification, setNotification, setSelectedChat } = ChatState();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="1px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
             {/* <Badge /> */}
              <BellIcon fontSize="2xl" m={1}count={notification.length} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No new message"}
              {notification.map((i) => {
                return (
                  <MenuItem
                    key={i._id}
                    onClick={() => {
                      setSelectedChat(i.chat);
                      setNotification(
                        notification.filter((item) => item !== i)
                      );
                    }}
                  >
                    {i.chat.isGroupChat
                      ? `New message in ${i.chat.chatName}`
                      : `New message in ${getSender(user, i.chat.users)}`}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.picture}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <DrawerComponent
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        search={search}
        handleChange={handleChange}
        setLoading={setLoading}
        setSearchResult={setSearchResult}
        user={user}
        loading={loading}
        searchResult={searchResult}
      />
    </>
  );
};

export default SideDrawer;
