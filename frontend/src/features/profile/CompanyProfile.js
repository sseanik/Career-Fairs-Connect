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
  const userData = useSelector((state) => state.user);

  const companyData = {
    companyID: userData.id,  //checked
    company: userData.name,
    description: userData.description,
    logo: userData.logo,
    website: userData.website,
  };
  
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
          fallbackSrc="https://via.placeholder.com/200"
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
