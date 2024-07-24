import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleImageUpload = (e) => {
    const pic = e.target.files[0];
    if (pic === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Chatapp");
      data.append("cloud_name", "dnbwzdfws");
      setPicLoading(true);
      fetch("https://api.cloudinary.com/v1_1/dnbwzdfws/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({ ...formData, picture: data.url.toString() });
          setPicLoading(false);
        })
        .catch((err) => {
      
          setPicLoading(false);
          toast({
            title: "Image upload failed!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setPicLoading(false);
    }
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    setPicLoading(true);
    if(!formData.name||!formData.email||!formData.password||!formData.confirmPassword){
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setPicLoading(false);
      return;
    
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
   try
   {
    const config={headers:{"Content-type":"Application/json"}}
    const {data}=await axios.post("/api/user",formData,config)

    toast({
      title: "Registration Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setPicLoading(false);
    navigate('/chats')
  }
  catch (error) {
    toast({
      title: "Error Occured!",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setPicLoading(false);
  }
};

  return (
    <VStack spacing="5px">
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired id="confirmPassword">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired id="picture">
        <FormLabel>Profile Pic</FormLabel>
        <Input
          type="file"
          name="picture"
          p={1.5}
          accept="image/*"
          onChange={handleImageUpload}
          disabled={picLoading}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default RegisterComponent;
