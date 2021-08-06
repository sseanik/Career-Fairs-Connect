import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react"
import { Formik } from 'formik';
import Navbar from '../components/navbar';
import axios from 'axios';

const bgcolor = "#2F303A";
const textColor = "#FFFFFF";

function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        color={textColor}
        type={show ? "text" : "password"}
      // placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default function Login() {
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
  };

  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "http://formspree.io/YOUR_FORM_ID",
      data: values
    })
      .then(response => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, "Thanks!");
      })
      .catch(error => {
        actions.setSubmitting(false);
        handleServerResponse(false, error.response.data.error);
      });
  };

  return (
    <ChakraProvider>
      <Navbar />
      <Flex width="100%" height="92vh" bg="#E5E5E5">
        <Box width="50%" m="auto" textAlign="center">
        </Box>
        <Box width="50%">
          <Box mt="10vh" fontWeight="medium" ml="auto" mr="auto" bg={ bgcolor } width="75%" textAlign="center" padding="5%" borderRadius="10px">
            <Heading color={ textColor }>
              Log in
              </Heading>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                // handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleOnSubmit}>

                  <FormControl id="email">
                    <FormLabel color={textColor}>Email</FormLabel>
                    <Input color={textColor} type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email} />
                  </FormControl>

                  {errors.email && touched.email && errors.email}

                  <FormControl id="password">
                    <FormLabel color={textColor}>Password</FormLabel>
                    <PasswordInput type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password} />
                  </FormControl>
                  {errors.password && touched.password && errors.password}
                  <Button
                    mt={4}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>
                </form>
              )}
            </Formik>

          </Box>
        </Box>
      </Flex>
    </ChakraProvider >
  );
}