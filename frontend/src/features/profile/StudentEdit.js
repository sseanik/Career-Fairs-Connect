import React from 'react';
import { useHistory } from 'react-router-dom';
import { asyncUpdateStudent } from '../auth/userSlice';
import {
  Stack,
  Container,
  Heading,
  FormLabel,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputControl } from 'formik-chakra-ui';
import { useSelector, useDispatch } from 'react-redux';
import UniSelector from './UniSelector.js';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is Required').max(32),
  lastName: Yup.string().required('Last Name is Required').max(32),
  university: Yup.string().required('University is Required'),
  wam: Yup.number().typeError("Please input a number."),
});

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const initialValues = {
    firstName: user.fname,
    lastName: user.lname,
    university: user.university,
    degree: user.degree,
    wam: user.wam,
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
          student_logo_64: 'no_logo',
          degree: values.degree,
          wam: values.wam,
        },
        id: user.studentId,
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
              <InputControl name='degree' label='Degree' />
              <InputControl name='wam' label='WAM' />

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
