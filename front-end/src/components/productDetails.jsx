import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    List,
    ListItem,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";

export function ProductsDetails() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchProductID() {
            const productData = await axios.get(
                `http://localhost:2000/product/details/${id}`
            );
            console.log(productData.data.results[0]);
            setProduct(productData.data.results[0]);
        }
        fetchProductID();
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
        <Container maxW={"7xl"}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}
            >
                <Flex>
                    <Image
                        rounded={"md"}
                        alt={"product image"}
                        src={product.image}
                        fit={"contain"}
                        align={"center"}
                        w={"100%"}
                        h={{ base: "100%", sm: "400px", lg: "500px" }}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={"header"}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                        >
                            {product.product_name}
                        </Heading>
                        <Text
                            color={"gray.900"}
                            fontWeight={300}
                            fontSize={"2xl"}
                        >
                            {product.price}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={"column"}
                        divider={
                            <StackDivider
                                borderColor={("gray.200", "gray.600")}
                            />
                        }
                    >
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text
                                color={"gray.500"}
                                fontSize={"2xl"}
                                fontWeight={"300"}
                            >
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore
                            </Text>
                            <Text fontSize={"lg"}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Ad aliquid amet at delectus
                                doloribus dolorum expedita hic, ipsum maxime
                                modi nam officiis porro, quae, quisquam quos
                                reprehenderit velit? Natus, totam.
                            </Text>
                        </VStack>
                        <Box>
                            <Text
                                fontSize={{ base: "16px", lg: "18px" }}
                                color={"yellow.500"}
                                fontWeight={"500"}
                                textTransform={"uppercase"}
                                mb={"4"}
                            >
                                Merchant Details
                            </Text>

                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={10}
                            >
                                <List spacing={2}>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Seller:
                                        </Text>{" "}
                                        {product.merchant_name}
                                    </ListItem>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Location:
                                        </Text>{" "}
                                        {product.address}
                                    </ListItem>
                                </List>
                            </SimpleGrid>
                        </Box>
                        <Box>
                            <Text
                                fontSize={{ base: "16px", lg: "18px" }}
                                color={"orange"}
                                fontWeight={"500"}
                                textTransform={"uppercase"}
                                mb={"4"}
                            >
                                Product Details
                            </Text>

                            <List spacing={2}>
                                <ListItem>
                                    <Text as={"span"} fontWeight={"bold"}>
                                        Category:
                                    </Text>{" "}
                                    {product.category}
                                </ListItem>
                                <ListItem>
                                    <Text as={"span"} fontWeight={"bold"}>
                                        Stock:
                                    </Text>{" "}
                                    {product.stock}
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>

                    <Button
                        rounded={"none"}
                        w={"full"}
                        mt={8}
                        size={"lg"}
                        py={"7"}
                        bg={"green"}
                        color={"white"}
                        textTransform={"uppercase"}
                        _hover={{
                            transform: "translateY(2px)",
                            boxShadow: "lg",
                        }}
                    >
                        Add to cart
                    </Button>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent={"center"}
                    >
                        <MdLocalShipping />
                        <Text>2-3 business days delivery</Text>
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}
