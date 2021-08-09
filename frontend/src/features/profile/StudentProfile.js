import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Spacer,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Divider,
  Box,
} from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  function handleClick() {
    history.push('/student/edit');
  }

  return (
    <Container
      rounded='2xl'
      mt='4'
      borderWidth='1px'
      maxW={'container.md'}
      p={12}
    >
      <Flex>
        <Heading fontSize='2xl' mb={5}>
          Student Profile
        </Heading>
        <Spacer />
        <Button
          leftIcon={<ArrowBackIcon />}
          rounded='lg'
          size={'sm'}
          fontWeight={'normal'}
          as={Link}
          to='/'
        >
          Back
        </Button>
      </Flex>

      <Divider />

      <Stack spacing={10} p={8}>
        <Box>
          <Text fontSize='xl' fontWeight='semibold'>
            Name
          </Text>
          <Divider />
          <Text fontSize='xl'>
            {user.fname} {user.lname}
          </Text>
        </Box>

        <Box>
          <Text fontSize='xl' fontWeight='semibold'>
            University
          </Text>
          <Divider />
          <Text fontSize='xl'>{user.university}</Text>
        </Box>

        <Box>
          <Text fontSize='xl' fontWeight='semibold'>
            Degree
          </Text>
          <Divider />
          <Text fontSize='xl'>{user.degree}</Text>
        </Box>

        <Box>
          <Text fontSize='xl' fontWeight='semibold'>
            WAM
          </Text>
          <Divider />
          <Text fontSize='xl'>{user.wam}</Text>
        </Box>
      </Stack>
      <Flex align='center' justify='center'>
        <Button
          leftIcon={<EditIcon />}
          rounded='lg'
          colorScheme='blue'
          width='90%'
          fontWeight={'normal'}
          onClick={handleClick}
        >
          Edit
        </Button>
      </Flex>
    </Container>
  );
}
