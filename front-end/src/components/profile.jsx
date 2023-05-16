import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Avatar,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Form, useNavigate, Link as LinkNav } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const onUpdate = async () => {
  try {
    let data = {};
    console.log("mau add");

    const fileInput = document.getElementById("filepath");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", document.getElementById("username").value);
    formData.append("bio", document.getElementById("bio").value);
    formData.append("full_name", document.getElementById("fullname").value);

    // console.log(data);
    const url = "http://localhost:2000/api/profile/edit";
    const result = await axios.post(url, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(result);
  } catch (err) {
    console.log(err);
    alert(err);
  }
};

const resendVerify = async () => {
  const verify_url = "http://localhost:2000/api/profile/verify";
  console.log(verify_url);
  try {
    const response = await axios
      .post(verify_url, null, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(posts.results);
        alert("Verify Link Resend");
      });
  } catch (err) {
    console.log(err.response.data);
  }
};

function Profile() {
  let [profile, setProfile] = useState([]);
  let [isVerified, setVerify] = useState();

  const getProfileURL = "http://localhost:2000/api/profile/show";
  console.log(getProfileURL);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axios
          .get("http://localhost:2000/api/profile/show", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setProfile(response.data.data);
            setVerify(response.data.data.is_verified);
            console.log(profile);
          });
      } catch (err) {
        console.log(err.response);
      }
    }
    getProfile();
  }, []);

  return (
    <Container maxW={"5xl"} py={12}>
      <Box p={4} border="1px" borderColor="gray.200">
        <Stack spacing={4}>
          <Flex display="flex" align="center" gap={4}>
            <Button
              leftIcon={<ArrowBackIcon />}
              width="fit-content"
              as={LinkNav}
              to="/home"
            >
              Back
            </Button>
            <Heading>Your Profile</Heading>
          </Flex>
          <Form onSubmit={onUpdate}>
            <FormControl id="filepath">
              <FormLabel>Profile Picture</FormLabel>
              <Flex gap={2} align="center">
                <Avatar
                  bg="green.500"
                  size="lg"
                  src={"http://".concat(profile.image)}
                  // src={"http://localhost:2000/uploads/1-1684232209689.png"}
                ></Avatar>
                <Input type="file"></Input>
              </Flex>
            </FormControl>

            <FormControl id="fullname">
              <FormLabel>Full Name</FormLabel>
              <Input type="text" defaultValue={profile.full_name}></Input>
            </FormControl>

            <FormControl id="bio">
              <FormLabel>Bio</FormLabel>
              <Textarea
                type="text"
                maxlength="160"
                defaultValue={profile.bio}
              ></Textarea>
            </FormControl>

            <SimpleGrid columns={2} spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input type="text" defaultValue={profile.username}></Input>
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Text m="revert">{profile.email}</Text>
              </FormControl>
            </SimpleGrid>

            <FormControl>
              <FormLabel>Account Status</FormLabel>
              <Text>Verified</Text>
              <Button
                variant="link"
                colorScheme="blue"
                fontWeight="normal"
                onClick={resendVerify}
              >
                Resend Email
              </Button>
            </FormControl>

            <Button
              colorScheme="blue"
              bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
              color="white"
              variant="solid"
              type="submit"
              onClick={onUpdate}
            >
              Update
            </Button>
          </Form>
        </Stack>
      </Box>
    </Container>
  );
}

export default Profile;
