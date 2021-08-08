import React from 'react';
import { useHistory } from 'react-router-dom';

import { asyncUpdateCompany } from '../auth/userSlice';
import {
  Stack,
  Container,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputControl, TextareaControl } from 'formik-chakra-ui';
import { useSelector, useDispatch } from 'react-redux';


const validationSchema = Yup.object({
  company: Yup.string().required('Company Name is Required').max(128),
  description: Yup.string()
    .required('Company Description is Required')
    .max(512),
  website: Yup.string()
    .matches(/^http(s)?:.*$/, 'Website URL is invalid')
    .required('Website URL is Required')
    .max(256),
  // logo: Yup.string().required('Logo upload is Required'),
});

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  console.log('user data in company edit:', user);

  const initialValues = {
    company: user.name,
    website: user.website,
    description: user.description,
    // logo: '', //companyData.logo,
  };

  // const [picture, setPicture] = useState(null);
  // const [imgSrc, setImgSrc] = useState(companyData.logo);

  // useEffect(() => {
  //   const image = document.getElementById("oldLogo");
  //   image.src = imgSrc;
  // }, [imgSrc]);

  // const base64Image = useSelector(selectBase64Image);
  const dispatch = useDispatch();
  const toast = useToast();
  // ?
  const saveStatus = useSelector((state) => state.user.status);

  // const uploadImage = (e, setFieldValue) => {
  //   dispatch(convertImageToBase64(e));
  //   setFieldValue('logo', e.target.value);
  //   console.log('e.target.value: ', e.target.value);
  //   setImgSrc(e.target.value);
  // };

  const submitForm = (values, actions) => {
    actions.setSubmitting(false);
    dispatch(asyncUpdateCompany({
      id: user.id,
      user: {
        company_name: values.company,
        company_description: values.description,
        company_webpage_url: values.website,
        company_logo_64: user.logo,
      },
      toast: toast,
    }));
  };

  function handleCancel() {
    history.push('/company');
  }

  return (
    <>
      <Container
        maxW={'container.md'}
        p={12}
      >
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
              spacing={'6'}
              onSubmit={handleSubmit}
            >

              <InputControl name='company' label='Company Name' />
              <TextareaControl name='description' label='Company Description' />
              <InputControl name='website' label='Website URL' />

              <Stack direction="row" spacing={4} justify='center'>
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
