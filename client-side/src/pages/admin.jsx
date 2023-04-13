import React from "react";
import { Navbar } from "../components/navbar";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Protection from "../components/protection";

function Admin() {
    const navigate = useNavigate();
    const { merchant_status } = useSelector((state) => state.userSlice.value);
    return (
        <div>
            <Navbar />
            {merchant_status ? (
                <Box textAlign="center" py={10} px={6}>
                    <Heading
                        display="inline-block"
                        as="h2"
                        size="2xl"
                        bgGradient="linear(to-r, blue.400, blue.600)"
                        backgroundClip="text"
                    >
                        Merchant
                    </Heading>
                    <Text fontSize="18px" mt={3} mb={2}>
                        Welcome to merchant page
                    </Text>
                    <Text color={"gray.500"} mb={6}>
                        If you can access this page it means you're a Merchant
                    </Text>

                    <Button
                        onClick={() => navigate("/")}
                        colorScheme="blue"
                        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                        color="white"
                        variant="solid"
                    >
                        Go to Home
                    </Button>
                    <Button
                        onClick={() => navigate("/adminForm")}
                        colorScheme="blue"
                        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                        color="white"
                        variant="solid"
                        ml="2"
                    >
                        Sell a Product
                    </Button>
                </Box>
            ) : (
                <Protection />
            )}
        </div>
    );
}

export default Admin;
