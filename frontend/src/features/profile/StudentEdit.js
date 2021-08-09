import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { asyncUpdateStudent } from '../auth/userSlice';
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
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { InputControl } from 'formik-chakra-ui';
import { useSelector, useDispatch } from 'react-redux';
import UniSelector from './UniSelector.js';
// import defaultAvatar from './default.png'
//process image
import { convertImageToBase64, selectBase64Image } from '../auth/logoSlice';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is Required').max(32),
  lastName: Yup.string().required('Last Name is Required').max(32),
  university: Yup.string().required('University is Required'),
  wam: Yup.number().typeError('Please input a number.'),
});

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const base64Image = useSelector(selectBase64Image);

  const initialValues = {
    firstName: user.fname,
    lastName: user.lname,
    university: user.university,
    degree: user.degree,
    wam: user.wam,
    logo: ''
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
      asyncUpdateStudent({
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          university: values.university,
          degree: values.degree,
          wam: values.wam,
          student_logo_64: update_logo,
        },
        id: user.studentID,
        toast: toast,
        history: history,
      })
    );
  };

  function handleCancel() {
    history.push('/student');
  }

  return (
    <>
      <Container
        maxW={'container.md'}
        p={12}
        rounded='2xl'
        mt='4'
        borderWidth='1px'
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
                <Image
                  id='oldLogo'
                  src={user.logo ? user.logo : './default.png'}
                  alt={`${user.fname}_${user.lname}`}
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

              <InputControl name='firstName' label='First Name' />
              <InputControl name='lastName' label='Last Name' />
              <FormLabel htmlFor='university'>Select University</FormLabel>
              <UniSelector />
              <InputControl name='degree' label='Degree' />
              <InputControl name='wam' label='WAM' />

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
