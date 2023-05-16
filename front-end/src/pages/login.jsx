import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const url = "http://localhost:2000/api/auth/login";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    try {
      const data = {
        emailOrUsername: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      const result = await axios.post(url, data);

      dispatch(
        login({
          id: result.data.data.id,
          username: result.data.data.username,
          email: result.data.data.email,
          phone_number: result.data.data.phone_number,
          merchant_status: result.data.data.merchant_status,
        })
      );

      console.log(result.data.data);

      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      localStorage.setItem("token", result.data.token);
      alert(result.data.message);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <Flex
      className="welcome-page"
      minH={"85vh"}
      bg="#9BA4B5"
      justify="center"
      align="center"
    >
      <Box>
        <Stack>
          <Heading
            as="h1"
            size="4xl"
            noOfLines={1}
            fontWeight="extrabold"
            textShadow="lg"
          >
            Get Social
          </Heading>
          <h1>Social and Beyond</h1>
        </Stack>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={6} align="center">
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address or Username</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* <FormControl id="password2">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl> */}
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link onClick={() => navigate("/home")} color={"blue.400"}>
                    Back to home
                  </Link>
                </Stack>
                <Button
                  colorScheme="blue"
                  bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
                  color="white"
                  variant="solid"
                  onClick={onLogin}
                >
                  Sign in
                </Button>
                <Button
                  bg="#F0F0F0"
                  color="grey"
                  variant="solid"
                  onClick={() => navigate("/register")}
                >
                  Create new Account
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};
