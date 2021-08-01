import { Field, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { InputControl, TextareaControl } from 'formik-chakra-ui';
import Navbar from '../../components/navbar';
import { useSelector, useDispatch } from 'react-redux';
import { convertImageToBase64, selectBase64Image } from './logoSlice';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  company: '',
  description: '',
  website: '',
  logo: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email format is Invalid')
    .required('Company Email is Required'),
  password: Yup.string()
    .required('Password is Required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password is Required'),
  company: Yup.string().required('Company Name is Required'),
  description: Yup.string(),
  website: Yup.string().matches(/^http(s)?:.*$/, 'Website URL is invalid'),
  logo: Yup.string(),
});

export default function EmployerRegister() {
  const base64Image = useSelector(selectBase64Image);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar />

      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log('hello')}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Box
            borderWidth='1px'
            rounded='lg'
            maxWidth={800}
            p={6}
            m='10px auto'
            as='form'
            onSubmit={handleSubmit}
          >
            <Heading>Employer Registration</Heading>
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
            <TextareaControl
              name='description'
              label='Company Description (Optional)'
            />
            <InputControl name='website' label='Website URL (Optional)' />

            <FormControl id='logo'>
              <FormLabel>Logo Image (Optional)</FormLabel>
              <input
                type='file'
                onChange={(e) => dispatch(convertImageToBase64(e))}
                accept='.jpeg, .png, .jpg'
              ></input>
            </FormControl>

            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
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
