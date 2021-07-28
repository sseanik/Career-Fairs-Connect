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
  logo: Yup.string().matches(
    /^http(s)?:\/\/.*\.(png|jpg|jpeg)$/,
    'Image URL is invalid'
  ),
});

export function EmployerRegister() {
  const [base64Image, setBase64Image] = React.useState('');

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load something...
      reader.onload = () => {
        // Make a fileInfo Object
        resolve(reader.result);
      };
    });
  };

  const handleFileInputChange = (e) => {
    getBase64(e.target.files[0])
      .then((result) => {
        setBase64Image(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <FormLabel>Logo Image</FormLabel>
              <input
                type='file'
                onChange={(e) => handleFileInputChange(e)}
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
