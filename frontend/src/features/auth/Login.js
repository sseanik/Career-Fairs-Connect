import
React
  // { useState }
  from "react";
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
import Navbar from '../../components/navbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const bgcolor = "white"; //"#2F303A";
const textColor = ""; //"#FFFFFF";

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
  const history = useHistory();
  localStorage.clear();

  function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('login-form');
    const email = form.email.value;
    const password = form.password.value;
    console.log('got from form: ', email, password)
    if (localStorage.getItem('token')) {
      localStorage.clear();
    }

    if (email !== '' && password !== '') {
      axios.post('/login',
        {
          login: email,
          password: password,
        }).then(info => {
          console.log(info);
          localStorage.setItem('token', info.token);
          //should it return more user information than token?
          //name, role...

          // history.push('/')

        })

      //fake testing local info
      localStorage.setItem('token', 'fakeToken');
      localStorage.setItem('name', 'fakeName');
      localStorage.setItem('role', 'company');

      history.push('/')
    }
  }
  return (
    <ChakraProvider>
      <Navbar />
      <Flex width="100%" height="92vh" bg="#E5E5E5">
        <Box width="50%" m="auto" textAlign="center">
        </Box>
        <Box width="50%">
          <Box mt="10vh" fontWeight="medium" ml="auto" mr="auto" bg={bgcolor} width="75%" textAlign="center" padding="5%" borderRadius="10px">
            <Heading color={textColor}>
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
                <form
                  id="login-form"
                  onSubmit={handleSubmit}
                >
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