import {
  Button,
  Flex,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Heading,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

import axios from "axios";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const { username, merchant_status } = useSelector(
    (state) => state.userSlice.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const onSignOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

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
            // console.log(response.data.data);
            setProfile(response.data.data);
            localStorage.setItem("user_id", profile.id);
            console.log(localStorage.getItem("user_id"));
          });
      } catch (err) {
        console.log(err.response.data);
      }
    }
    fetchPosts();
  }, []);

  return (
    <VStack
      justify="space-evenly"
      align="center"
      shadow="base"
      bgColor="gray.50"
      h="16"
      p={8}
    >
      <Flex w={"100%"}>
        <Link class="navbar-brand" to="/home">
          <Heading>Get Social</Heading>
          {/* <Image src={logo} alt="icon" className="icon-logo" /> */}
        </Link>
        <Spacer></Spacer>
        <Flex>
          {token ? (
            <>
              <Menu>
                <Avatar
                  as={MenuButton}
                  mr="4"
                  name={username}
                  size="md"
                  bg="green.500"
                  textColor="white"
                  src={"http://".concat(profile?.image)}
                />
                <MenuList>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem>My Posts</MenuItem>
                  <MenuItem>My Likes</MenuItem>
                  <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/")}
                rounded={"full"}
                colorScheme="teal"
                variant="solid"
                mr="2"
              >
                Login
              </Button>
              <Button
                mr="2"
                rounded={"full"}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </VStack>
  );
};
