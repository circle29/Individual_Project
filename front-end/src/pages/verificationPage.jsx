import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

function Verification() {
  const navigate = useNavigate();

  let { token } = useParams();

  const tokenVerification = async () => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:2000/api/auth/verification",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <div>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, blue.400, blue.600)"
          backgroundClip="text"
        >
          Verified
        </Heading>
        <Text color={"gray.500"} mb={6}>
          Your Account Is Verified, Have Fun!
        </Text>

        <Button
          onClick={() => navigate("/")}
          colorScheme="blue"
          bgGradient="linear(to-r, blue.300, blue.500, blue.500)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Box>
    </div>
  );
}

export default Verification;
