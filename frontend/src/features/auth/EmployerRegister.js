import * as React from 'react';
import { Fade } from 'react-awesome-reveal';

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
  Flex,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { InputControl, TextareaControl } from 'formik-chakra-ui';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { convertImageToBase64, selectBase64Image } from './logoSlice';
import { asyncRegisterCompany } from './userSlice';
import { Link, useHistory } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

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
    .matches(/^http(s)?:.*$/, 'Website URL is invalid. Must contain http(s)://')
    .required('Website URL is Required')
    .max(256),
  logo: Yup.string().required('Logo upload is Required'),
});

export default function EmployerRegister() {
  const base64Image = useSelector(selectBase64Image);
  const registerStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const history = useHistory();

  const uploadImage = (e, setFieldValue) => {
    dispatch(convertImageToBase64(e));
    setFieldValue('logo', e.target.value);
  };

  const submitForm = (values, actions) => {
    actions.setSubmitting(false);
    dispatch(
      asyncRegisterCompany({
        user: {
          email: values.email,
          password: values.password,
          company_name: values.company,
          company_description: values.description,
          company_webpage_url: values.website,
          company_logo_64: base64Image,
        },
        history: history,
        toast: toast,
      })
    );
  };

  return (
    <div>
      <Fade duration={750}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => submitForm(values, actions)}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
            <Box
              position={'relative'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}
              maxWidth={800}
              p={6}
              m='10px auto'
              as='form'
              onSubmit={handleSubmit}
              mt='3'
              borderWidth='1px'
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.900'}
            >
              <Flex
                justify='center'
                direction={{ base: 'column', sm: 'row' }}
                align='stretch'
              >
                <Button
                  leftIcon={<ArrowBackIcon />}
                  rounded='lg'
                  size={'sm'}
                  fontWeight={'normal'}
                  colorScheme={'gray'}
                  as={Link}
                  to='/register'
                >
                  Back
                </Button>
                <Heading
                  flex={1}
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: 'xl', sm: '3xl', lg: '4xl' }}
                  py='2'
                  align='center'
                >
                  <Text
                    zIndex={4}
                    as={'span'}
                    position={'relative'}
                    _after={{
                      content: "''",
                      width: 'full',
                      height: '30%',
                      position: 'absolute',
                      bottom: 1,
                      left: 0,
                      bg: colorMode === 'light' ? 'green.50' : 'green.900',
                      zIndex: -1,
                    }}
                  >
                    Employer Registration
                  </Text>
                </Heading>
              </Flex>
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
                      form.errors.confirmPassword &&
                      form.touched.confirmPassword
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
              <Flex justify='center'>
                <Button
                  w='100%'
                  mt={4}
                  colorScheme='green'
                  isLoading={registerStatus}
                  loadingText='Registering'
                  type='submit'
                >
                  Join Now
                </Button>
              </Flex>
              <Flex
                justify='center'
                pt='2'
                direction={{ base: 'column', sm: 'row' }}
                align='center'
              >
                {'Already have an account? '}
                <Text
                  pl='1'
                  as={Link}
                  to='/login'
                  _hover={{ textDecoration: 'underline' }}
                >
                  Click here to login.
                </Text>
              </Flex>
            </Box>
          )}
        </Formik>
      </Fade>
    </div>
  );
}
