import { Box, Container, Text } from "@chakra-ui/react";
import React ,{useEffect} from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LoginComponent from "../authentication/login"
import RegisterComponent from "../authentication/register";
import { useNavigate } from "react-router-dom";

const HomePageComponent = () => {
  const navigate=useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   
    if(!userInfo){
        navigate('/')
    }
 
  }, []);
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Talk-A-Live
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color='black'>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <LoginComponent/>
            </TabPanel>
            <TabPanel>
           <RegisterComponent/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePageComponent;
