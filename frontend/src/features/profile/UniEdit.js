import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { asyncUpdateUniversity } from '../auth/userSlice';
import {
  Stack,
  Container,
  Heading,
  FormLabel,
  Button,
  useToast,
  //Image
  Image,
  FormControl,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { InputControl } from 'formik-chakra-ui';
import { useSelector, useDispatch } from 'react-redux';
import UniSelector from './UniSelector.js';
//process image
import { convertImageToBase64, selectBase64Image } from '../auth/logoSlice';

//use yup for form value validation
const validationSchema = Yup.object({
  website: Yup.string()
    .matches(/^http(s)?:.*$/, 'Website URL is invalid')
    .required('Website URL is Required')
    .max(256),
  university: Yup.string().required('University is Required'),
});

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  //transform image to base64 format
  const base64Image = useSelector(selectBase64Image);

  const initialValues = {
    university: user.name,
    website: user.website,
    logo: '', //user.logo,
  };

  //update src show the uploaded image
  useEffect(() => {
    const image = document.getElementById('oldLogo');
    image.src = base64Image;
  }, [base64Image]);

  const dispatch = useDispatch();
  const toast = useToast();
  const saveStatus = useSelector((state) => state.user.status);

  const uploadImage = (e, setFieldValue) => {
    dispatch(convertImageToBase64(e));
    setFieldValue('logo', e.target.value);
  };

  const submitForm = (values, actions) => {
    const update_logo = values.logo ? base64Image : user.logo;
    actions.setSubmitting(false);
    dispatch(
      asyncUpdateUniversity({
        user: {
          university_name: values.university,
          university_site_url: values.website,
          university_logo_64: update_logo,
        },
        id: user.universityID,
        toast: toast,
        history: history,
      })
    );
  };

  function handleCancel() {
    history.push('/university');
  }

  return (
    <>
      <Container
        rounded='2xl'
        mt='4'
        borderWidth='1px'
        maxW={'container.md'}
        p={12}
      >
        <Heading
          as={'h2'}
          fontSize={{ base: 'xl', sm: '2xl' }}
          textAlign={'center'}
          mb={5}
        >
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
              spacing={'6'}
              onSubmit={handleSubmit}
            >
              <Stack
                direction='row'
                spacing={10}
                align='center'
                justify='center'
              >
                <Flex direction={{ base: 'column', md: 'row' }} align='center'>
                  <Image
                    id='oldLogo'
                    src={user.logo}
                    alt={`${user.name}-logo`}
                    boxSize='150px'
                    objectFit='contain'
                    mr='4'
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
                </Flex>
              </Stack>

              <InputControl name='website' label='Website URL' />
              <FormLabel htmlFor='university'>Select University</FormLabel>
              <UniSelector />

              <Stack direction='row' spacing={4} justify='center'>
                <Button
                  colorScheme={'blue'}
                  variant={'outline'}
                  w={'150px'}
                  onClick={handleCancel}
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
      </Container>
    </>
  );
}
