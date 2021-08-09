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
  Image,
  Link as ChakraLink,
  Divider,
  Center,
  Box,
} from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  function handleClick() {
    history.push('/university/edit');
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
          University Profile
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

      <Center h='260px' color='white'>
        <Image
          src={user.logo}
          alt={`${user.name}-logo`}
          fallbackSrc='https://via.placeholder.com/200'
          boxSize='200px'
          objectFit='contain'
        />
      </Center>

      <Stack spacing={10} px={10}>
        <Box>
          <Text fontSize='xl' fontWeight='semibold'>
            Name
          </Text>
          <Divider />
          <Text fontSize='xl'>{user.name}</Text>
        </Box>

        <Box>
          <Text fontSize='xl' fontWeight='semibold'>
            Website
          </Text>
          <Divider />
          <Text fontSize='xl' as={ChakraLink} isExternal href={user.website}>
            {user.website}
          </Text>
        </Box>
      </Stack>
      <Flex align='center' justify='center' mt='6'>
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
