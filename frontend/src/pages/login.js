import React from 'react';
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
import Navbar from '../components/navbar'


function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        color="#FFFFFF"
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

function Login() {
  return (
    <ChakraProvider>
      <Navbar />
      <Flex width="100%" height="92vh" bg="#E5E5E5">
        <Box width="50%" m="auto" textAlign="center">
        </Box>
        <Box width="50%">
          <Box mt="10vh" fontWeight="medium" ml="auto" mr="auto" bg="#2F303A" width="75%" textAlign="center" padding="5%" borderRadius="10px">

            <Heading color="#FFFFFF">Log in</Heading>

            <FormControl id="email">
              <FormLabel color="#FFFFFF">Email</FormLabel>
              <Input color="#FFFFFF" type="email" />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>

            <FormControl id="password">
              <FormLabel color="#FFFFFF">Password</FormLabel>
              <PasswordInput />
            </FormControl>

            <Button
              mt={4}
              // isLoading={isSubmitting}
              type='submit'
            >
              Log in
            </Button>

          </Box>
        </Box>
      </Flex>
    </ChakraProvider >
  );
}

export default Login