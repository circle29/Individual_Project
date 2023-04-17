import {
    Box,
    Heading,
    Text,
    Img,
    Flex,
    Center,
    HStack,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";

import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";

// const IMAGE = "https://picsum.photos/300";

export function Products() {
    const [products, setProducts] = useState([]);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            const productData = await axios.get(
                "http://localhost:2000/product/show"
            );
            console.log(productData.data.result);
            setProducts(productData.data.result);
        }
        fetchProducts();
    }, []);

    function rupiah(price) {
        const priceString = price.toString();
        const len = priceString.length;
        let str = "";
        for (let i = 0; i < len; i++) {
            str += priceString[i];
            if ((len - i - 1) % 3 === 0 && i !== len - 1) {
                str += ".";
            }
        }
        return `Rp ${str}`;
    }

    return (
        <Stack spacing={8} mx={"auto"} w={"80%"} py={12} px={6}>
            <Stack align={"center"}>
                {/* <Heading fontSize={"4xl"} textAlign={"center"}>
                    Available Products
                </Heading> */}
            </Stack>
            <Center py={6}>
                <SimpleGrid columns={3} spacing={10}>
                    {products.map((product) => (
                        <Box
                            w="xs"
                            rounded={"sm"}
                            my={5}
                            mx={[5]}
                            overflow={"hidden"}
                            bg="white"
                            border={"1px"}
                            borderColor="black"
                            boxShadow={"6px 6px 0 lightgreen"}
                        >
                            <Box
                                h={"300px"}
                                borderBottom={"1px"}
                                borderColor="black"
                            >
                                <Img
                                    src={product.image}
                                    roundedTop={"sm"}
                                    objectFit="cover"
                                    h="full"
                                    w="full"
                                    alt={"Product Image"}
                                />
                            </Box>
                            <Box p={4}>
                                <Heading
                                    color={"black"}
                                    fontSize={"2xl"}
                                    noOfLines={1}
                                >
                                    {product.name}
                                </Heading>
                                <Text color={"gray.700"} p={0}>
                                    Item in stock: {product.stock}
                                </Text>
                                <Text color={"gray.500"} p={0}>
                                    {product.description}
                                </Text>
                            </Box>
                            <HStack borderTop={"1px"} color="black">
                                <Flex
                                    p={4}
                                    alignItems="center"
                                    justifyContent={"space-between"}
                                    roundedBottom={"sm"}
                                    cursor={"pointer"}
                                    w="full"
                                >
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={"semibold"}
                                    >
                                        {rupiah(product.price)}
                                    </Text>
                                    <BsArrowUpRight
                                        onClick={() =>
                                            navigate("/product/" + product.id)
                                        }
                                    />
                                </Flex>
                                <Flex
                                    p={4}
                                    alignItems="center"
                                    justifyContent={"space-between"}
                                    roundedBottom={"sm"}
                                    borderLeft={"1px"}
                                    cursor="pointer"
                                    onClick={() => setLiked(!liked)}
                                >
                                    {liked ? (
                                        <BsHeartFill
                                            fill="red"
                                            fontSize={"24px"}
                                        />
                                    ) : (
                                        <BsHeart fontSize={"24px"} />
                                    )}
                                </Flex>
                            </HStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Center>
        </Stack>
    );
}
