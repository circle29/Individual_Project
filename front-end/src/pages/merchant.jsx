import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";

//importan redux
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export const RegisterMerchant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const url = "http://localhost:2000/merchant/register";

    const onRegister = async () => {
        const onSignOut = () => {
            dispatch(logout());
            localStorage.removeItem("token");
            navigate("/login");
        };

        try {
            const data = {
                name: document.getElementById("name").value,
                address: document.getElementById("address").value,
            };

            //untuk menghandle request bearer header
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const result = await axios.post(url, data, config);
            console.log(result);

            //untuk mereset kembali form
            document.getElementById("name").value = "";
            document.getElementById("address").value = "";

            //memberikan alert dan akan relog user untuk mereset token
            alert(result.data.message);
            setTimeout(() => {
                onSignOut();
            }, 1500);
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
                        Register Merchant
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Merchant Name</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl id="address" isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input type="text" />
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
