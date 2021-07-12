import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import { ChakraProvider, Box } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <Navbar></Navbar>
      <Box>Hello there</Box>
    </ChakraProvider>
  );
}

export default App;
