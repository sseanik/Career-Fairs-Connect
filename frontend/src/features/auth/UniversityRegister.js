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
import { InputControl, SelectControl } from 'formik-chakra-ui';
import Navbar from '../../components/navbar';
import { useSelector, useDispatch } from 'react-redux';
import { convertImageToBase64, selectBase64Image } from './logoSlice';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  university: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email format is Invalid')
    .required('University Email is Required'),
  password: Yup.string()
    .required('Password is Required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password is Required'),
  university: Yup.string()
    .oneOf([
      'Australian Catholic University',
      'Australian National University',
      'Bond University',
      'Charles Darwin University',
      'Charles Stuart University',
      'CQUniversity',
      'Curtin University',
      'Deakin University',
      'Edith Cowan University',
      'Federation University Australia',
      'Flinders University',
      'Griffith University',
      'James Cook University',
      'La Trobe University',
      'Macquarie University',
      'Monash University',
      'Murdoch University',
      'Queensland University of Technology',
      'RMIT University',
      'Southern Cross University',
      'Swinburne University of Technology',
      'Torrens University Australia',
      'University of Adelaide',
      'University of Canberra',
      'University of Divinity',
      'University of Melbourne',
      'University of New England',
      'University of New South Wales',
      'University of Newcastle',
      'University of Notre Dame Australia',
      'University of Queensland',
      'University of South Australia',
      'University of Southern Queensland',
      'University of Sydney',
      'University of Tasmania',
      'University of Technology Sydney',
      'University of the Sunshine Coast',
      'University of Western Australia',
      'University of Wollongong',
      'Victoria University',
      'Western Sydney University',
    ])
    .required('University is Required'),
  logo: Yup.string(),
});

export function UniversityRegister() {
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
            <Heading>University Registration</Heading>
            <InputControl name='email' label='Student Email' />
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
            <FormLabel htmlFor='university'>Select University</FormLabel>
            <SelectControl
              name='university'
              selectProps={{ placeholder: 'Select option' }}
            >
              <option value='Australian Catholic University'>
                Australian Catholic University
              </option>
              <option value='Australian National University'>
                Australian National University
              </option>
              <option value='Bond University'>Bond University</option>
              <option value='Charles Darwin University'>
                Charles Darwin University
              </option>
              <option value='Charles Stuart University'>
                Charles Stuart University
              </option>
              <option value='CQUniversity'>CQUniversity</option>
              <option value='Curtin University'>Curtin University</option>
              <option value='Deakin University'>Deakin University</option>
              <option value='Edith Cowan University'>
                Edith Cowan University
              </option>
              <option value='Federation University Australia'>
                Federation University Australia
              </option>
              <option value='Flinders University'>Flinders University</option>
              <option value='Griffith University'>Griffith University</option>
              <option value='James Cook University'>
                James Cook University
              </option>
              <option value='La Trobe University'>La Trobe University</option>
              <option value='Macquarie University'>Macquarie University</option>
              <option value='Monash University'>Monash University</option>
              <option value='Murdoch University'>Murdoch University</option>
              <option value='Queensland University of Technology'>
                Queensland University of Technology
              </option>
              <option value='RMIT University'>RMIT University</option>
              <option value='Southern Cross University'>
                Southern Cross University
              </option>
              <option value='Swinburne University of Technology'>
                Swinburne University of Technology
              </option>
              <option value='Torrens University Australia'>
                Torrens University Australia
              </option>
              <option value='University of Adelaide'>
                University of Adelaide
              </option>
              <option value='University of Canberra'>
                University of Canberra
              </option>
              <option value='University of Divinity'>
                University of Divinity
              </option>
              <option value='University of Melbourne'>
                University of Melbourne
              </option>
              <option value='University of New England'>
                University of New England
              </option>
              <option value='University of New South Wales'>
                University of New South Wales
              </option>
              <option value='University of Newcastle'>
                University of Newcastle
              </option>
              <option value='University of Notre Dame Australia'>
                University of Notre Dame Australia
              </option>
              <option value='University of Queensland'>
                University of Queensland
              </option>
              <option value='University of South Australia'>
                University of South Australia
              </option>
              <option value='University of Southern Queensland'>
                University of Southern Queensland
              </option>
              <option value='University of Sydney'>University of Sydney</option>
              <option value='University of Tasmania'>
                University of Tasmania
              </option>
              <option value='University of Technology Sydney'>
                University of Technology Sydney
              </option>
              <option value='University of the Sunshine Coast'>
                University of the Sunshine Coast
              </option>
              <option value='University of Western Australia'>
                University of Western Australia
              </option>
              <option value='University of Wollongong'>
                University of Wollongong
              </option>
              <option value='Victoria University'>Victoria University</option>
              <option value='Western Sydney University'>
                Western Sydney University
              </option>
            </SelectControl>

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
