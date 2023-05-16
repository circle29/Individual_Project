import PostItem from "../components/postItem";
import { Navbar } from "../components/navbar";
import {
  Container,
  SimpleGrid,
  Stack,
  Flex,
  Text,
  Input,
  Button,
  Heading,
  Box,
  FormControl,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import React, { useEffect, useState } from "react";

const addComment = async (params) => {
  console.log(params);
  console.log(document.getElementById("comment").value);
  try {
    let formData = {
      text: document.getElementById("comment").value,
    };

    console.log(formData);

    const url = `http://localhost:2000/api/comment/`.concat(params.id);
    const result = await axios.post(url, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    document.getElementById("comment").value = "";

    window.location.reload();
  } catch (err) {
    console.log(err);
    alert(err.response.data);
  }
};

export const PostDetail = () => {
  let [post, setPost] = useState();
  let [comments, setComments] = useState([]);

  const params = useParams();

  useEffect(() => {
    async function getPost() {
      try {
        const response = await axios
          .get("http://localhost:2000/api/post/".concat(params.id), {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setPost(response.data.data);
            // console.log(post);
          });
      } catch (err) {
        console.log(err);
      }
    }
    async function getComments() {
      try {
        const response = await axios
          .get("http://localhost:2000/api/comment/post/".concat(params.id), {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setComments(response.data.data);
          });
      } catch (err) {
        console.log(err.response.data);
      }
    }
    getPost();
    getComments();
  }, []);
  return (
    <Box>
      <Navbar></Navbar>
      <Container maxW={"6xl"} p={4} mt={8}>
        <Flex display="flex" align="center" gap={4}>
          <Button width="fit-content" as={Link} to="/home">
            Back
          </Button>
          <Heading size="sm">Post Detail</Heading>
        </Flex>
        <SimpleGrid columns={2}>
          {post && (
            <PostItem
              usernames={post.user.username}
              caption={post.caption}
              likes={post.like_count}
              createdAt={new Date(post.createdAt).toDateString()}
              id={post.id}
              image={post.image}
              comment={post.comment}
              profile={post.user.image}
            ></PostItem>
          )}
          <Stack gap={8}>
            <Box>
              <Heading size={2}>Comments</Heading>
              {comments?.map((keyword) => (
                <Flex gap={4}>
                  <Text>{keyword.user.username}</Text>
                  <Text>{keyword.text}</Text>
                </Flex>
              ))}
              <FormControl id="comment">
                <Flex gap={4}>
                  <Input placeholder="Add Comment"></Input>
                  <Button
                    size="xs"
                    variant="link"
                    colorScheme="blue"
                    fontWeight="normal"
                    onClick={() => addComment(params)}
                  >
                    Add
                  </Button>
                </Flex>
              </FormControl>
            </Box>
            <Box>
              <Heading size={2}>Edit Post</Heading>
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
// export default PostDetail;
