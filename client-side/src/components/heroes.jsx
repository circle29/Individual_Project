import {
    Flex,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";

export const Heroes = () => {
    return (
        <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
                <Stack spacing={6} w={"full"} maxW={"lg"}>
                    <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                        <Text
                            as={"span"}
                            position={"relative"}
                            _after={{
                                content: "''",
                                width: "full",
                                height: useBreakpointValue({
                                    base: "20%",
                                    md: "30%",
                                }),
                                position: "absolute",
                                bottom: 1,
                                left: 0,
                                bg: "blue.400",
                                zIndex: -1,
                            }}
                        >
                            Tokopedia
                        </Text>
                        <br />{" "}
                        <Text color={"blue.400"} as={"span"}>
                            Tokopedia
                        </Text>{" "}
                    </Heading>
                    <Text
                        fontSize={{ base: "md", lg: "lg" }}
                        color={"gray.500"}
                    >
                        Insert text here
                    </Text>
                </Stack>
            </Flex>
        </Stack>
    );
};
