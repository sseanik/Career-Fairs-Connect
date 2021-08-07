import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { asyncUpdateStudent } from '../auth/userSlice';
import {
  Stack,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { InputControl, TextareaControl } from 'formik-chakra-ui';
import { useSelector, useDispatch } from 'react-redux';
import UniSelector from './UniSelector.js';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is Required').max(32),
  lastName: Yup.string().required('Last Name is Required').max(32),
  university: Yup.string().required('University is Required'),
});

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  console.log('student info=', user);

  const initialValues = {
    fname: 'afafafaf',//user.fname,
    lname: user.lname,
    university: user.university,
  };

  const dispatch = useDispatch();
  const toast = useToast();
  // ?
  const saveStatus = useSelector((state) => state.user.status);

  const submitForm = (values, actions) => {
    actions.setSubmitting(false);
    dispatch(
      asyncUpdateStudent({
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          university: values.university,
        },
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
          {({ isSubmitting, handleSubmit }) => (

            <Stack
              direction='column'
              as={'form'}
              spacing={'6'}
              onSubmit={handleSubmit}
            >

              <InputControl name='firstName' label='First Name' />
              <InputControl name='lastName' label='Last Name' />
              <FormLabel htmlFor='university'>Select University</FormLabel>
              <UniSelector />

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
