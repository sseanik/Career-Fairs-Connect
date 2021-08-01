import React from 'react';
import Navbar from '../components/navbar';
import { ChakraProvider, Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <ChakraProvider>
      <Navbar />
      <Box
        width='100%'
        height='92vh'
        backgroundImage="url('https://www.gostudy.com.au/wp-content/uploads/2019/01/internship_sider.jpg')"
        backgroundSize='cover'
        transform='rotateY(180deg)'
      >
        <Box transform='rotateY(180deg)' color='#2F303A' mr='50%'>
          <Box pt='23vh' fontSize='4xl' fontWeight='medium'>
            Connecting Students with Opportunities
          </Box>
          <Box mt='3%' fontSize='2xl'>
            Find the right internship or
          </Box>
          <Box fontSize='2xl'>graduate role for you</Box>
          <Link to='/register'>
            <Button
              mt='3%'
              fontSize='2xl'
              padding='28px'
              color='white'
              bgColor='#516C7B'
            >
              Join Now
            </Button>
          </Link>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
