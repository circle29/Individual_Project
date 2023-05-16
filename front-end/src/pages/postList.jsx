import { Container, GridItem, Grid, Box } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import PostNew from "../components/postNew";
import PostItem from "../components/postItem";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

export const PostList = () => {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios
          .get("http://localhost:2000/api/post/", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response.data.data);
            setPosts(response.data.data);
          });
      } catch (err) {
        console.log(err.response.data);
      }
    }
    fetchPosts();
  }, []);

  return (
    <Box>
      <Navbar></Navbar>
      <Container maxW={"7xl"} mt={9}>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={8} p={2}>
            {posts?.map((keyword) => (
              <PostItem
                usernames={keyword.user.username}
                caption={keyword.caption}
                likes={keyword.like_count}
                createdAt={new Date(keyword.createdAt).toDateString()}
                id={keyword.id}
                image={keyword.image}
                comment={keyword.comment}
                profile={keyword.user.image}
                user_id={keyword.user.id}
              ></PostItem>
            ))}
          </GridItem>

          <GridItem colSpan={4}>
            <PostNew></PostNew>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

// export default PostList;
