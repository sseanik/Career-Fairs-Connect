import * as React from 'react';
// Formik
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
// Chakra
import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useToast,
} from '@chakra-ui/react';
import { InputControl, TextareaControl } from 'formik-chakra-ui';
// Components
import Navbar from '../../components/navbar';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { convertImageToBase64, selectBase64Image } from './logoSlice';
import { asyncRegisterCompany } from './userSlice';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  company: '',
  website: '',
  logo: '',
  description: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email format is Invalid')
    .required('Company Email is Required')
    .max(64),
  password: Yup.string()
    .required('Password is Required')
    .min(6, 'Password must be at least 6 characters')
    .max(32),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password is Required')
    .max(32),
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

export default function EmployerRegister() {
  const base64Image = useSelector(selectBase64Image);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const registerStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  const toast = useToast();

  const uploadImage = (e, setFieldValue) => {
    dispatch(convertImageToBase64(e));
    setFieldValue('logo', e.target.value);
  };

  React.useState(() => {
    if (loggedIn) {
      console.log('Sign the user In');
    }
  });

  const submitForm = (values, actions) => {
    console.log(values);
    console.log(base64Image[0]);
    actions.setSubmitting(false);
    dispatch(asyncRegisterCompany({ user: {}, toast: toast }));
  };

  return (
    <div>
      <Navbar />

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => submitForm(values, actions)}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, handleSubmit, setFieldValue }) => (
          <Box
            borderWidth='1px'
            rounded='lg'
            maxWidth={800}
            p={6}
            m='10px auto'
            as='form'
            onSubmit={handleSubmit}
          >
            <Heading mb='2'>Employer Registration</Heading>
            <InputControl name='email' label='Email' />
            <Field name='password'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input {...field} id='password' type='password' />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='confirmPassword'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.confirmPassword && form.touched.confirmPassword
                  }
                >
                  <FormLabel htmlFor='confirmPassword'>
                    Confirm Password
                  </FormLabel>
                  <Input {...field} id='confirmPassword' type='password' />
                  <FormErrorMessage>
                    {form.errors.confirmPassword}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <InputControl name='company' label='Company Name' />
            <TextareaControl name='description' label='Company Description' />
            <InputControl name='website' label='Website URL' />

            <Field name='logo'>
              {({ field, form }) => (
                <FormControl
                  id='logo'
                  isInvalid={form.errors.logo && form.touched.logo}
                >
                  <FormLabel>Logo Image</FormLabel>
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
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={registerStatus}
              loadingText='Registering'
              type='submit'
            >
              Join Now
            </Button>
          </Box>
        )}
      </Formik>
    </div>
  );
}
