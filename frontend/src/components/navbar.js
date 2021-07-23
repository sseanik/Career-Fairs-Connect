import React from 'react';
import { Flex, Box, Spacer, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Flex
      id='menu'
      bg='#2F303A'
      w='100%'
      h='8vh'
      color='white'
      textAlign='center'
      margin='auto'
      fontSize='xl'
    >
      <Box margin='auto' paddingLeft='4%'>
        <ChakraLink as={Link} to='/'>
          Company Logo/Name
        </ChakraLink>
      </Box>
      <Spacer />
      <Flex margin='auto' paddingRight='4%'>
        <Box paddingRight='50px'>
          <ChakraLink as={Link} to='/login'>
            Login
          </ChakraLink>
        </Box>
        <ChakraLink as={Link} to='/register'>
          Join
        </ChakraLink>
      </Flex>
    </Flex>
  );
}

export default Navbar;
