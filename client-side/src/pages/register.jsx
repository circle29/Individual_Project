import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required"),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be 4 characters at minimum")
      .required("Password is required"),
  });

  const onRegister = async (values) => {
    try {
        const data = values;
        
        const result = await axios.post('http://localhost:2000/user/register', data);

        Swal.fire({
          icon: 'success',
          title: result.data.message,
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() => {
          navigate("/login");
        }, 1500);

    } catch (err) {
        console.log(err.response.data);
        if (err.response.data) {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: err.response.data.errors[0].message,
            showConfirmButton: false,
            timer: 1500
          })
        }
    }
  }

  const inputStyle = {
    border: '1px solid #E2E8F0',
    borderRadius: '0.375rem',
    padding: '7px 16px',
    width: '100%'
  }

  const errorStyle = { color: "red", fontSize: "12px", marginTop: "0px" };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >

          <Formik
            initialValues={{ firstName: "", lastName: "", email: "", password: "", }}
            validationSchema={RegisterSchema}
            onSubmit={(values, {resetForm}) => {
              onRegister(values);
              resetForm();
            }}
          >
            {(props) => {
              // console.log(props);
              return (
                <Form>
                  
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <FormControl id="firstName" isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Field type="text" name="firstName" style={inputStyle}/>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="lastName">
                          <FormLabel>Last Name</FormLabel>
                          <Field type="text" name="lastName" style={inputStyle}/>
                        </FormControl>
                      </Box>
                    </HStack>
                    <ErrorMessage component="div" name="firstName" style={errorStyle}
                    />
                    <FormControl id="email" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Field type="email" name="email" style={inputStyle}/>
                      <ErrorMessage component="div" name="email" style={errorStyle} />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Field type={showPassword ? "text" : "password"} name="password" style={inputStyle}/>
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <ErrorMessage component="div" name="password" style={errorStyle} />
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        // onClick={onRegister}
                        type="submit"
                      >
                        Sign up
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={"center"}>
                        <Link color={"blue.400"} onClick={() => navigate("/")}>
                          Back to home
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Form>
              )
            }}
          </Formik>

        </Box>
      </Stack>
    </Flex>
  );
};
