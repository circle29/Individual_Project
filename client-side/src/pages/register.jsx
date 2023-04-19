import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onRegister = async () => {
        try {
            const data = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                phone_number: document.getElementById("phone_number").value,
                password: document.getElementById("password").value,
                password_confirmation:
                    document.getElementById("confirmation").value,
            };

            const url = "http://localhost:2000/auth/register";
            const result = await axios.post(url, data);
            console.log(result);

            //untuk mereset kembali form

            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone_number").value = "";
            document.getElementById("password").value = "";
            document.getElementById("confirmation").value = "";

            //memberikan alert
            alert(result.data.message);
        } catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={500}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="phone_number" isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) => !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="confirmation" isRequired>
                            <FormLabel>Password Confirmation</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) => !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                colorScheme="teal"
                                variant="solid"
                                onClick={onRegister}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                <Link
                                    color={"blue.400"}
                                    onClick={() => navigate("/")}
                                >
                                    Back to home
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
