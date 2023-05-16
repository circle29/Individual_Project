import {
  Button,
  Container,
  Avatar,
  Text,
  Flex,
  Stack,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

// const token = localStorage.getItem("token");

const setPost = async (e) => {
  e.preventDefault();
  try {
    let data = {};

    const fileInput = document.getElementById("postImage");
    const file = fileInput.files[0]; // Get the first selected file

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", document.getElementById("caption").value);

    const url = "http://localhost:2000/api/post";
    const result = await axios.post(url, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    document.getElementById("caption").value = "";
    document.getElementById("postImage").value = "";

    window.location.reload();
  } catch (err) {
    console.log(err);
    alert(err.response.data);
  }
};

function PostNew() {
  let [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios
          .get("http://localhost:2000/api/profile/show", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response.data.data);
            setProfile(response.data.data);
          });
      } catch (err) {
        console.log(err.response.data);
      }
    }
    fetchPosts();
  }, []);

  return (
    <Container>
      <Stack
        p={4}
        border="1px"
        borderColor="gray.200"
        align="center"
        spacing={4}
      >
        <Flex align="center" gap={4} w={"100%"}>
          <Avatar size="md" src={"http://".concat(profile?.image)}></Avatar>
          <Stack>
            <Text m={0}>{profile?.username}</Text>
            <Text m={0}>{profile?.full_name}</Text>
          </Stack>
        </Flex>
        <Divider></Divider>
        <Form>
          <Stack>
            <FormControl isRequired id="postImage">
              <FormLabel>Image</FormLabel>
              <Input type="file"></Input>
            </FormControl>
            <FormControl isRequired id="caption">
              <FormLabel>Captions</FormLabel>
              <Textarea></Textarea>
            </FormControl>
            <FormControl>
              <Button
                colorScheme="blue"
                bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                variant="solid"
                as={Link}
                w={"100%"}
                type="submit"
                onClick={setPost}
              >
                Add New Post
              </Button>
            </FormControl>
          </Stack>
        </Form>
      </Stack>
    </Container>
  );
}

export default PostNew;
