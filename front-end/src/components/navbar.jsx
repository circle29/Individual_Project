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
} from "@chakra-ui/react";
import { Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

//assets
import logo from "../assets/logo.png";

//importan redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

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
        navigate("/login");
    };

    return (
        <VStack
            justify="space-evenly"
            align="flex-end"
            shadow="base"
            bgColor="gray.50"
            w="100vw"
            h="16"
        >
            <Flex align="center" className="mr-auto ml-4">
                <Link class="navbar-brand" to="/">
                    <Image src={logo} alt="icon" className="icon-logo" />
                </Link>
                <Flex align="center" ml={"820"}>
                    {token ? (
                        <>
                            <Menu>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="45"
                                    height="45"
                                    fill="currentColor"
                                    class="bi bi-cart-check-fill"
                                    viewBox="0 0 16 16"
                                    className="mr-2 cart-button"
                                >
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                </svg>
                                <Avatar
                                    as={MenuButton}
                                    mr="4"
                                    name={username}
                                    size="md"
                                    bg="green.500"
                                    textColor="white"
                                />
                                <MenuList>
                                    <MenuItem
                                        onClick={() => navigate("/profile")}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem>My Merchant</MenuItem>
                                    <MenuItem>Setting</MenuItem>
                                    {merchant_status ? (
                                        <MenuItem
                                            onClick={() =>
                                                navigate("/addProduct")
                                            }
                                        >
                                            Sell a Product
                                        </MenuItem>
                                    ) : (
                                        <MenuItem
                                            onClick={() =>
                                                navigate("/registerMerchant")
                                            }
                                        >
                                            {" "}
                                            Register Merchant{" "}
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={onSignOut}>
                                        Sign Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Text as="b">Welcome, {username}</Text>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => navigate("/login")}
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
