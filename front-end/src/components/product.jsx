import {
    Card,
    CardBody,
    Image,
    Button,
    ButtonGroup,
    Text,
    Heading,
    CardFooter,
    Center,
    SimpleGrid,
    Stack,
    Select,
    Input,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import axios from "axios";
import { useState, useEffect } from "react";

export function Products() {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState(0);
    const [category, setCategory] = useState(0);
    const [name, setName] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            let url;

            switch (parseInt(sort)) {
                //mengurutkan dari nama produk A-Z
                case 1:
                    url = `http://localhost:2000/product/show?order=name&sort=ASC&category=${category}&name=${name}&page=${activePage}`;
                    break;
                //mengurutkan nama Z-A
                case 2:
                    url = `http://localhost:2000/product/show?order=name&sort=DESC&category=${category}&name=${name}&page=${activePage}`;
                    break;
                //mengurutkan harga dari termahal - termurah
                case 3:
                    url = `http://localhost:2000/product/show?order=price&sort=DESC&category=${category}&name=${name}&page=${activePage}`;
                    break;
                //mengurutkan harga dari termurah - termahal
                case 4:
                    url = `http://localhost:2000/product/show?order=price&sort=ASC&category=${category}&name=${name}&page=${activePage}`;
                    break;
                default:
                    url = `http://localhost:2000/product/show?order=createdAt&sort=DESC&category=${category}&name=${name}&page=${activePage}`;
            }

            const productData = await axios.get(url);
            console.log(productData.data);
            setProducts(productData.data.result);
            setTotalPage(Math.ceil(productData.data.count / 9));
        }
        fetchProducts();
    }, [sort, category, name, activePage]);

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
                <Heading fontSize={"4xl"} textAlign={"center"} color="teal">
                    Available Products
                </Heading>
                <Input
                    placeholder="Search Product Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Select
                    placeholder="Sort by"
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="1">Sort by Product Name A-Z</option>
                    <option value="2">Sort by Product Name Z-A</option>
                    <option value="3">Sort by Price Highest-Lowest</option>
                    <option value="4">Sort by Price Lowest-Highest</option>
                </Select>
                <Select
                    placeholder="Filter by Category"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="1">Food</option>
                    <option value="2">Fashion</option>
                    <option value="3">Health</option>
                    <option value="4">Entertainment</option>
                    <option value="5">Electronics</option>
                    <option value="6">Otomotif</option>
                </Select>
            </Stack>
            <Center py={6}>
                <SimpleGrid columns={3} spacing={10}>
                    {products.map((product) => {
                        return (
                            <Card
                                maxW="sm"
                                css={{
                                    border: "2px solid whitesmoke",
                                }}
                            >
                                <CardBody>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        borderRadius="lg"
                                        objectFit={"cover"}
                                        h={"200px"}
                                        w={"250px"}
                                        css={{
                                            border: "2px solid whitesmoke",
                                        }}
                                    />
                                    <Stack mt="6" spacing="3">
                                        <Heading size="md">
                                            {product.name}
                                        </Heading>
                                        <Text>{rupiah(product.price)}</Text>
                                        <div className="mt-2">
                                            Items in Stock: {product.stock}
                                        </div>
                                    </Stack>
                                </CardBody>
                                <CardFooter>
                                    <ButtonGroup spacing="2">
                                        <Button
                                            variant="solid"
                                            colorScheme="teal"
                                            onClick={() =>
                                                navigate(
                                                    "/product/" + product.id
                                                )
                                            }
                                        >
                                            Details
                                        </Button>
                                        <Button
                                            variant="solid"
                                            colorScheme="teal"
                                        >
                                            Add to cart
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </SimpleGrid>
            </Center>
            <Center>
                <Pagination
                    activePage={activePage}
                    totalPages={totalPage}
                    //untuk mengganti halaman
                    onPageChange={(e, pageInfo) => {
                        setActivePage(pageInfo.activePage);
                        console.log(pageInfo);
                    }}
                />
            </Center>
        </Stack>
    );
}
