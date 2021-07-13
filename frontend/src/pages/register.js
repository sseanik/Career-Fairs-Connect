import React from 'react';
import { ChakraProvider, Flex, Box, Button, Link as ChakraLink } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

function Register() {
  return (
    <ChakraProvider>
      <Flex id="menu" w="100%" bg="#E5E5E5"  h="8vh" color="white" fontSize="xl">
          <Box mt="auto" mb="auto" paddingLeft="4%" color="#2F303A">
            <ChakraLink>
              <Link to="/">
                Company Logo/Name
              </Link>
            </ChakraLink>
          </Box>
      </Flex>
      <Flex width="100%" height="92vh" bg="#E5E5E5">
        <Box width="50%" m="auto" textAlign="center">
        </Box>
        <Box width="50%">
          <Box mt="10vh" fontWeight="medium" ml="auto" mr="auto" bg="#2F303A" width="75%" textAlign="center" padding="5%" borderRadius="10px">
            <Box fontSize="4xl" color="#FFFFFF">
              Join Now
            </Box>
            <Box>
              <Link to="/register/student">
                <Button mt="12%" fontSize="2xl" padding="28px" color="white" bgColor="#516C7B" width="70%" fontWeight="medium">
                  I am a student
                </Button>
              </Link>
            </Box>
            <Box>
              <Link to="/register/employer">
                <Button mt="8%" fontSize="2xl" padding="28px" color="white" bgColor="#516C7B" width="70%" fontWeight="medium">
                  I am an employer
                </Button>
              </Link>
            </Box>
            <Box>
              <Link to="/register/university">
                <Button mt="8%" mb="8%" fontSize="2xl" padding="28px" color="white" bgColor="#516C7B" width="70%" fontWeight="medium">
                  I am a university
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Register