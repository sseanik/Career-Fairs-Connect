import React from 'react';
import Navbar from '../components/navbar'
import { ChakraProvider, Box } from "@chakra-ui/react"

function Home() {
  return (
    <ChakraProvider>
      <Navbar></Navbar>
      <Box>Hello there</Box>
    </ChakraProvider>
  );
}

export default Home