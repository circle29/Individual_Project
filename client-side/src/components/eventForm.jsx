import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const EventForm = () => {
  const token = localStorage.getItem("token");

  const EventSchema = Yup.object().shape({
    name: Yup.string()
      .required("Event name is required"),
    date: Yup.date()
      .required("Date is required"),
    venue: Yup.string()
      .required("Venue is required"),
    total_ticket: Yup.number()
      .min(1, "Minimum 1 ticket")
      .required("Total ticket is required"),
    price: Yup.number()
      .min(0, "Minimum price is 0")
      .required("Price is required"),
  });

  const submitNewEvent = async (values) => {
    try {
        const data = values;

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const result = await axios.post('http://localhost:2000/event/create', data, config);

        Swal.fire({
          icon: 'success',
          title: result.data.message,
          showConfirmButton: false,
          timer: 1500
        })

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
            Create New Event
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          width={500}
        >

          <Formik
            initialValues={{ name: "", date: "", venue: "", total_ticket: 1, price: 0 }}
            validationSchema={EventSchema}
            onSubmit={(values, {resetForm}) => {
              submitNewEvent(values);
              resetForm();
            }}
          >
            {(props) => {
              // console.log(props);
              return (
                <Form>
                  
                  <Stack spacing={4}>
                    <FormControl id="name" isRequired>
                      <FormLabel>Event Name</FormLabel>
                      <Field type="text" name="name" style={inputStyle}/>
                      <ErrorMessage component="div" name="name" style={errorStyle} />
                    </FormControl>
                    <FormControl id="date" isRequired>
                      <FormLabel>Date</FormLabel>
                      <Field type="date" name="date" style={inputStyle}/>
                      <ErrorMessage component="div" name="date" style={errorStyle} />
                    </FormControl>
                    <FormControl id="venue" isRequired>
                      <FormLabel>Venue</FormLabel>
                      <Field type="text" name="venue" style={inputStyle}/>
                      <ErrorMessage component="div" name="venue" style={errorStyle} />
                    </FormControl>
                    <FormControl id="total_ticket" isRequired>
                      <FormLabel>Total Ticket Available</FormLabel>
                      <Field type="number" name="total_ticket" style={inputStyle}/>
                      <ErrorMessage component="div" name="total_ticket" style={errorStyle} />
                    </FormControl>
                    <FormControl id="price" isRequired>
                      <FormLabel>Price</FormLabel>
                      <Field type="number" name="price" style={inputStyle}/>
                      <ErrorMessage component="div" name="price" style={errorStyle} />
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
                        // onClick={submitNewEvent}
                        type="submit"
                      >
                        Submit New Event
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
