import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice'

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const LoginSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
      password: Yup.string()
        .min(4, "Password must be 4 characters at minimum")
        .required("Password is required"),
    });

    const onLogin = async (values) => {
        try {
            const data = values;

            const result = await axios.post('http://localhost:2000/user/login', data);

            Swal.fire({
              icon: "success",
              title: result.data.message,
              showConfirmButton: false,
              timer: 1500,
            });

            localStorage.setItem("token", result.data.token);

            dispatch(setUserData(result.data.data));

            setTimeout(() => {
              navigate("/");
            }, 1500);

        } catch (err) {
            console.log(err);
            if (err.response.data) {
              Swal.fire({
                icon: "error",
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: err.response.data.errors[0].message,
                showConfirmButton: false,
                timer: 1500,
              });
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >

          <Formik
            initialValues={{ firstName: "", lastName: "", email: "", password: "", }}
            validationSchema={LoginSchema}
            onSubmit={(values, {resetForm}) => {
              onLogin(values);
              resetForm();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <Stack spacing={4}>
                    <FormControl id="email">
                      <FormLabel>Email address</FormLabel>
                      <Field type="text" name="email" style={inputStyle}/>
                      <ErrorMessage component="div" name="email" style={errorStyle} />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Password</FormLabel>
                      <Field type="password" name="password" style={inputStyle}/>
                      <ErrorMessage component="div" name="password" style={errorStyle} />
                    </FormControl>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Remember me</Checkbox>
                        <Link onClick={() => navigate("/")} color={"blue.400"}>
                          Back to home
                        </Link>
                      </Stack>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        // onClick={onLogin}
                        type="submit"
                      >
                        Sign in
                      </Button>
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
