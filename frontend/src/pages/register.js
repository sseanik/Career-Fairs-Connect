import React from 'react';
import { ChakraProvider, Flex, Link, Box, Button } from "@chakra-ui/react"

function Register() {
  return (
    <ChakraProvider>
      <Flex id="menu" w="100%" bg="#E5E5E5"  h="8vh" color="white" fontSize="xl">
        <Link mt="auto" mb="auto" paddingLeft="4%" href="/" color="#2F303A">
          Company Logo/Name
        </Link>
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
              <Link href="/register/student">
                <Button mt="12%" fontSize="2xl" padding="28px" color="white" bgColor="#516C7B" width="70%" fontWeight="medium">
                  I am a student
                </Button>
              </Link>
            </Box>
            <Box>
              <Link href="/register/employer">
                <Button mt="8%" fontSize="2xl" padding="28px" color="white" bgColor="#516C7B" width="70%" fontWeight="medium">
                  I am an employer
                </Button>
              </Link>
            </Box>
            <Box>
              <Link href="/register/university">
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