import { Button, Flex, VStack, Menu, MenuButton, Avatar, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { removeUserData } from "../redux/userSlice.js"

export const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const onSignOut = () => {
    localStorage.removeItem("token")
    dispatch(removeUserData());
    navigate("/login")
  }

  return (
    <VStack justify='space-evenly' align='flex-end' shadow="base" bgColor="gray.50" w="100vw" h="16">
      <Flex justify='space-evenly' align="center" mr="4">
        {token? (
          <>
            <Menu>
              <Avatar
              as={MenuButton}
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                mr="2"
              />
              <MenuList>
                <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
            <Text as="b">Welcome, {userData.firstName}</Text>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate("/login")}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              mr='2'
            >
              Login
            </Button>
            <Button mr='2' rounded={"full"} onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Flex>
    </VStack>
  );
};
