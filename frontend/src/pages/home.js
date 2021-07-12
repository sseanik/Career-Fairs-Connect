import React from 'react';
import Navbar from '../components/navbar'
import { ChakraProvider, Box } from "@chakra-ui/react"

function Home() {
  return (
    <ChakraProvider>
      <Navbar></Navbar>
      <Box width="100%" height="92vh" backgroundImage="url('https://www.gostudy.com.au/wp-content/uploads/2019/01/internship_sider.jpg')" backgroundSize="cover">
        Hello there
      </Box>
    </ChakraProvider>
  );
}

export default Home