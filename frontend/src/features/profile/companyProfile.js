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
// import { useSelector, useDispatch } from 'react-redux';
// import { asyncFetchUserData } from '../auth/userSlice';

const companyData = {
  companyID: '1',
  company: 'Canva',
  description: 'Canva is a graphic design company',
  logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Canva_Logo.png',
  website: 'https://canva.com',
};

export default function Profile() {
  const history = useHistory();

  function handleClick() {
    history.push('/company/edit');
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
          Company Profile
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
          src={companyData.logo}
          alt={`${companyData.company}-logo`}
          boxSize="200px"
          objectFit='contain'
        />
      </Center>

      <Stack spacing={10} px={10}>
        <Box>
          <Text fontSize="xl" fontWeight='semibold'>Name</Text>
          <Divider />
          <Text fontSize="xl">{companyData.company}</Text>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight='semibold'>Website</Text>
          <Divider />
          <Text fontSize="xl">{companyData.website}</Text>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight='semibold'>Description</Text>
          <Divider />
          <Text fontSize="xl">{companyData.description}</Text>
        </Box>
      </Stack>

    </Container>
  );
}
