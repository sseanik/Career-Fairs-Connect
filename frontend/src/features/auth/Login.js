import React from 'react'; // { useState }
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Text,
  FormErrorMessage,
  useToast,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { InputControl } from 'formik-chakra-ui';
import { Field, Form, Formik } from 'formik';
import Navbar from '../../components/navbar';
import { Link, useHistory } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Fade from 'react-reveal/Fade';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoginUser } from './userSlice';

const textColor = ''; //"#FFFFFF";

const initialValues = {
  email: '',
  password: '',
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
});

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  const loginStatus = useSelector((state) => state.user.status);
  const [show, setShow] = React.useState(false);

  const submitForm = (values, setSubmitting) => {
    dispatch(
      asyncLoginUser({
        user: { email: values.email, password: values.password },
        toast: toast,
        history: history,
      })
    );
  };

  return (
    <div>
      <Navbar />
      <Fade duration={750}>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          pt='6'
        >
          <Box>
            <Box
              position={'relative'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}
              bg='white'
              maxWidth={800}
              p={6}
              m='10px auto'
            >
              <Flex justify='flex-start' pb='4'>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  rounded='lg'
                  size={'sm'}
                  fontWeight={'normal'}
                  colorScheme={'gray'}
                  as={Link}
                  to='/'
                >
                  Back
                </Button>
              </Flex>
              <Flex
                w={'100%'}
                h={'20vh'}
                backgroundImage={
                  'url(https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/news/news-masthead-19b-cover-career-fair.jpg)'
                }
                backgroundSize={'cover'}
                backgroundPosition={'top center'}
                mb='4'
              >
                <VStack
                  w={'100%'}
                  justify={'center'}
                  px={useBreakpointValue({ base: 4, md: 8 })}
                  bg='blackAlpha.600'
                >
                  <Flex
                    maxW={'2xl'}
                    align={'center'}
                    spacing={6}
                    justify='center'
                    w='100%'
                  >
                    <Text
                      as={Flex}
                      justify='center'
                      color={'white'}
                      fontWeight={500}
                      lineHeight={1.2}
                      fontSize='4xl'
                      width={useBreakpointValue({
                        xs: '80vw',
                        sm: '80vw',
                        md: '3xl',
                        lg: '4xl',
                      })}
                    >
                      Login
                    </Text>
                  </Flex>
                </VStack>
              </Flex>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, setSubmitting) =>
                  submitForm(values, setSubmitting)
                }
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form id='login-form' onSubmit={handleSubmit}>
                    <FormControl id='email'>
                      <FormLabel color={textColor}>Email</FormLabel>
                      <InputControl
                        color={textColor}
                        type='email'
                        name='email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </FormControl>

                    <Field name='password'>
                      {({ field, form }) => (
                        <FormControl
                          pt='4'
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel htmlFor='password'>Password</FormLabel>

                          <InputGroup size='md'>
                            <Input
                              {...field}
                              id='password'
                              pr='4.5rem'
                              color={textColor}
                              type={show ? 'text' : 'password'}
                              // placeholder="Enter password"
                            />
                            <InputRightElement width='4.5rem'>
                              <Button
                                h='1.75rem'
                                size='sm'
                                onClick={() => setShow(!show)}
                              >
                                {show ? 'Hide' : 'Show'}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex justify='center'>
                      <Button
                        w='100%'
                        mt={4}
                        colorScheme='blue'
                        isLoading={loginStatus}
                        loadingText='Logging In'
                        type='submit'
                      >
                        Login
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Flex>
      </Fade>
    </div>
  );
}
