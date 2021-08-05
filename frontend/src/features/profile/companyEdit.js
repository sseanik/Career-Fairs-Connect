import React from 'react';
import Navbar from '../../components/navbar';
import { convertImageToBase64, selectBase64Image } from '../auth/logoSlice';
import { asyncFetchUserData, asyncRegisterCompany } from '../auth/userSlice';
import {
  Box,
  Stack,
  useColorModeValue,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useToast,
  Flex,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { InputControl, TextareaControl } from 'formik-chakra-ui';
import { EditIcon } from '@chakra-ui/icons';

import { useSelector, useDispatch } from 'react-redux';

const companyData = {
  companyID: '1',
  company: 'Canva',
  description: 'Canva is a graphic design company',
  logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Canva_Logo.png',
  website: 'https://canva.com',
};

const initialValues = {
  company: companyData.company,
  website: companyData.website,
  logo: '',
  description: companyData.description,
};

const validationSchema = Yup.object({
  company: Yup.string().required('Company Name is Required').max(128),
  description: Yup.string()
    .required('Company Description is Required')
    .max(512),
  website: Yup.string()
    .matches(/^http(s)?:.*$/, 'Website URL is invalid')
    .required('Website URL is Required')
    .max(256),
  logo: Yup.string().required('Logo upload is Required'),
});

export default function Profile() {
  const [editing, setEditing] = React.useState(false);
  const base64Image = useSelector(selectBase64Image);
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode } = useColorMode();
  // ?
  const saveStatus = useSelector((state) => state.user.status);

  console.log('initial editng state', editing);

  const uploadImage = (e, setFieldValue) => {
    dispatch(convertImageToBase64(e));
    setFieldValue('logo', e.target.value);
  };

  const submitForm = (values, actions) => {
    console.log(values);
    console.log(base64Image[0]);
    actions.setSubmitting(false);
    dispatch(asyncRegisterCompany({ user: {}, toast: toast }));
  };

  function EditProfile() {
    return (
      <>
        <Heading
          as={'h2'}
          fontSize={{ base: 'xl', sm: '2xl' }}
          textAlign={'center'}
          mb={5}>
          Edit Profile
        </Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => submitForm(values, actions)}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
            <Stack
              direction='column'
              as={'form'}
              spacing={'12px'}
              onSubmit={handleSubmit}
            >
              <Stack direction="row" spacing={10} align='center' justify='center'>
                <Image
                  src={companyData.logo}
                  alt={`${companyData.company}-logo`}
                  boxSize="150px"
                  objectFit='cover'
                />
                <Field name='logo'>
                  {({ field, form }) => (
                    <FormControl
                      id='logo'
                      isInvalid={form.errors.logo && form.touched.logo}
                    >
                      <FormLabel>Update New Logo</FormLabel>
                      <input
                        {...field}
                        type='file'
                        onChange={(e) => uploadImage(e, setFieldValue)}
                        accept='.jpeg, .png, .jpg'
                      ></input>
                      <FormErrorMessage>{form.errors.logo}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <InputControl name='company' label='Company Name' />
              <TextareaControl name='description' label='Company Description' />
              <InputControl name='website' label='Website URL' />

              <Stack direction="row" spacing={4} justify='center'>
                <Button
                  colorScheme={'blue'}
                  variant={'outline'}
                  w={'150px'}
                // onClick={setEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme={'blue'}
                  variant={'solid'}
                  w={'150px'}
                  isLoading={saveStatus}
                  loadingText='Saving'
                  type='submit'
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          )}
        </Formik>
      </>
    )
  }

  function ViewProfile() {
    return (
      <>
        <Stack  align='center'>
          <Stack direction='row' spacing={10} justify='center'>
            <Image
              src={companyData.logo}
              alt={`${companyData.company}-logo`}
              boxSize="150px"
              objectFit='contain'
            />
            <Box>
              <Heading
                as={'h2'}
                fontSize={{ base: 'xl', sm: '2xl' }}
                textAlign={'center'}
                mb={5}>
                {companyData.company}
              </Heading>
              <Text fontSize="2xl">{companyData.website}</Text>
            </Box>
            <Flex justify='flex-end' pb='4'>
              <Button
                leftIcon={<EditIcon />}
                rounded='lg'
                size={'sm'}
                fontWeight={'normal'}
                colorScheme={'gray'}
              // onClick={setEditing(true)}
              >
                Edit Profile
              </Button>
            </Flex>
          </Stack>
          <Text fontSize="2xl">{companyData.description}</Text>
        </Stack>
      </>
    )
  }
  return (
    <>
      <Navbar />
      <Flex
        minH={'80vh'}
        // align={'center'}
        justify={'center'}
      >
        <Container
          maxW={'container.md'}
          bg={useColorModeValue('white', 'whiteAlpha.100')}
          p={6}
          direction={'column'}
        >
          {console.log("editing?", editing)}
          {editing ? <EditProfile /> : <ViewProfile />}
        </Container>
      </Flex>
    </>
  );
}