import React from 'react';
import {
  Flex,
  Box,
  Button,
  useColorModeValue,
  Stack,
  Text,
  Heading,
  Container,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { Blob } from '../landing/LandingHero';
import { FaBuilding, FaUniversity } from 'react-icons/fa';
import { IoSchoolSharp } from 'react-icons/io5';
import Fade from 'react-reveal/Fade';

function Register() {
  return (
    <div>
      <Navbar />
      <Container maxW={'7xl'} px={{ base: 10, md: 10 }}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 2, md: 4 }}>
            <Fade duration={750}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: '30%',
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'blue.50',
                    zIndex: -1,
                  }}
                >
                  Join Now
                </Text>
              </Heading>
              <Heading
                lineHeight={1.1}
                fontWeight={500}
                fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
              >
                <Text as={'span'} color={'blue.400'} size='sm'>
                  Register an account with our platform
                </Text>
              </Heading>
              <Text color={'gray.500'}>
                Choose the type of account you would like to register whether
                you are a university, a student of a university or an employer.
              </Text>
              <Text as='span' color={'gray.500'}>
                Already have an account?{' '}
                <Text
                  as={Link}
                  to='/login'
                  decoration='underline'
                  color='gray.700'
                >
                  Login here.
                </Text>
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}
              >
                <Button
                  rounded='lg'
                  size={'md'}
                  fontWeight={'normal'}
                  px={6}
                  colorScheme={'gray'}
                  as={Link}
                  to='/'
                >
                  Go Back
                </Button>
              </Stack>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}
              ></Stack>
            </Fade>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Blob
              w={'150%'}
              h={'150%'}
              position={'absolute'}
              top={'-20%'}
              left={0}
              zIndex={-1}
              color={useColorModeValue('blue.50', 'blue.400')}
            />
            <Box
              position={'relative'}
              height={'300px'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}
              bg='white'
            >
              <Fade duration={500} width='100%'>
                <Flex
                  direction='column'
                  fontWeight='medium'
                  ml='auto'
                  mr='auto'
                  width='90%'
                  textAlign='center'
                  padding='5%'
                  borderRadius='10px'
                >
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}
                    zIndex={2}
                    mb='4'
                  >
                    <Text
                      as={'span'}
                      position={'relative'}
                      _after={{
                        content: "''",
                        width: 'full',
                        height: '30%',
                        position: 'absolute',
                        bottom: 1,
                        left: 0,
                        bg: 'blue.50',
                        zIndex: -1,
                      }}
                    >
                      What type of user are you?
                    </Text>
                  </Heading>

                  <VStack direction='column' spacing='5%'>
                    <Button
                      leftIcon={<IoSchoolSharp />}
                      fontSize='xl'
                      w='70%'
                      fontWeight='medium'
                      as={Link}
                      to='/register/student'
                      colorScheme='blue'
                    >
                      I am a Student
                    </Button>
                    <Button
                      leftIcon={<FaBuilding />}
                      fontSize='xl'
                      w='70%'
                      fontWeight='medium'
                      as={Link}
                      to='/register/employer'
                      colorScheme='green'
                    >
                      I am an Employer
                    </Button>
                    <Button
                      leftIcon={<FaUniversity />}
                      fontSize='xl'
                      w='70%'
                      fontWeight='medium'
                      as={Link}
                      to='/register/university'
                      colorScheme='orange'
                    >
                      I am a University
                    </Button>
                  </VStack>
                </Flex>
              </Fade>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </div>
  );
}

export default Register;
