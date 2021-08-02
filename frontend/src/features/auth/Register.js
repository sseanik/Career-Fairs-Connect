import React from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';

function Register() {
  return (
    <div>
      <Navbar />
      <Flex width='100%' height='92vh' bg='#E5E5E5'>
        <Box width='50%' m='auto' textAlign='center'></Box>
        <Box width='50%'>
          <Box
            mt='10vh'
            fontWeight='medium'
            ml='auto'
            mr='auto'
            bg='#2F303A'
            width='75%'
            textAlign='center'
            padding='5%'
            borderRadius='10px'
          >
            <Box fontSize='4xl' color='#FFFFFF'>
              Join Now
            </Box>
            <Box>
              <Button
                mt='12%'
                fontSize='2xl'
                padding='28px'
                color='white'
                bgColor='#516C7B'
                width='70%'
                fontWeight='medium'
                as={Link}
                to='/register/student'
              >
                I am a student
              </Button>
            </Box>
            <Box>
              <Button
                mt='8%'
                fontSize='2xl'
                padding='28px'
                color='white'
                bgColor='#516C7B'
                width='70%'
                fontWeight='medium'
                as={Link}
                to='/register/employer'
              >
                I am an employer
              </Button>
            </Box>
            <Box>
              <Button
                mt='8%'
                mb='8%'
                fontSize='2xl'
                padding='28px'
                color='white'
                bgColor='#516C7B'
                width='70%'
                fontWeight='medium'
                as={Link}
                to='/register/university'
              >
                I am a university
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Register;
