import React from 'react';
import { useHistory } from 'react-router-dom';
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
import { EditIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  console.log(JSON.stringify(user));
  
  
  function handleClick() {
    history.push('/student/edit');
  }

  return (
    <Container
      maxW={'container.md'}
      p={12}
    >
      <Flex>
        <Heading
          fontSize='2xl'
          mb={5}>
          Student Profile
        </Heading>
        <Spacer />
        <Button
          leftIcon={<EditIcon />}
          rounded='lg'
          size={'sm'}
          fontWeight={'normal'}
          onClick={handleClick}
        >
          Edit
        </Button>
      </Flex>

      <Divider />

      <Stack spacing={10} p={8} >
        <Box>
          <Text fontSize="xl" fontWeight='semibold'>Name</Text>
          <Divider />
          <Text fontSize="xl">{user.fname} {user.lname}</Text>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight='semibold'>University</Text>
          <Divider />
          <Text fontSize="xl">{user.university}</Text>
        </Box>
        
      </Stack>

    </Container>
  );
}
