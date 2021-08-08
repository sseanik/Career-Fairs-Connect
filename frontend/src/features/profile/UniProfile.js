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
  Image,
  Divider,
  Center,
  Box,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  
  function handleClick() {
    history.push('/university/edit');
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
          University Profile
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

      <Center h="260px" color="white">
        <Image
          src={user.logo}
          alt={`${user.name}-logo`}
          fallbackSrc="https://via.placeholder.com/200"
          boxSize="200px"
          objectFit='contain'
        />
      </Center>

      <Stack spacing={10} px={10}>
        <Box>
          <Text fontSize="xl" fontWeight='semibold'>Name</Text>
          <Divider />
          <Text fontSize="xl">{user.name}</Text>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight='semibold'>Website</Text>
          <Divider />
          <Text fontSize="xl">{user.website}</Text>
        </Box>

      </Stack>

    </Container>
  );
}
