import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { asyncUpdateCompany } from '../auth/userSlice';
import {
  Stack,
  Container,
  Heading,
  Button,
  useToast,
  //Image
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { InputControl, TextareaControl } from 'formik-chakra-ui';
import { useSelector, useDispatch } from 'react-redux';
//process image
import { convertImageToBase64, selectBase64Image } from '../auth/logoSlice';

const validationSchema = Yup.object({
  company: Yup.string().required('Company Name is Required').max(128),
  description: Yup.string()
    .required('Company Description is Required')
    .max(512),
  website: Yup.string()
    .matches(/^http(s)?:.*$/, 'Website URL is invalid')
    .required('Website URL is Required')
    .max(256),
});

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const base64Image = useSelector(selectBase64Image);

  const initialValues = {
    company: user.name,
    website: user.website,
    description: user.description,
    logo: '', //user.logo,
  };

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
      asyncUpdateCompany({
        id: user.id,
        user: {
          company_name: values.company,
          company_description: values.description,
          company_webpage_url: values.website,
          company_logo_64: update_logo,
        },
        toast: toast,
        history: history,
      })
    );
  };

  function handleCancel() {
    history.push('/company');
  }

  return (
    <>
      <Container maxW={'container.md'} p={12}>
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
                <Image
                  id='oldLogo'
                  src={user.logo}
                  alt={`${user.name}-logo`}
                  boxSize='150px'
                  objectFit='contain'
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
