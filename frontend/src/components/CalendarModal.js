import React from 'react';
// Chakra UI
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
// Formik
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
// Redux
import { useDispatch } from 'react-redux';
import { asyncAddPresentation } from '../features/companyStall/stallSlice';

const validationSchema = Yup.object({
  title: Yup.string().required('Presentation Title is Required').max(126),
  description: Yup.string()
    .required('Presentation Description is Required')
    .max(512),
  link: Yup.string()
    .matches(/^http(s)?:.*$/, 'Presentation URL is invalid')
    .required('Presentation Link is Required')
    .max(256),
});

const initialValues = {
  title: '',
  description: '',
  link: '',
};

export function CalendarModal(props) {
  const dispatch = useDispatch();
  const [next, setNext] = React.useState(false);
  const toast = useToast();

  const closeModal = () => {
    setNext(false);
    props.onClose();
  };

  const submitModal = (values, actions) => {
    dispatch(
      asyncAddPresentation({
        presentation: {
          title: values.title,
          description: values.description,
          link: values.link,
          start: props.event.start.getTime(),
          end: props.event.end.getTime(),
          color: props.color,
        },
        toast: toast,
      })
    );
    actions.setSubmitting(false);
    closeModal();
  };

  return (
    <Modal onClose={() => closeModal()} isOpen={props.isOpen} isCentered>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => submitModal(values, actions)}
      >
        {({ isSubmitting }) => (
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader m='0' pb='0'>
                {next ? 'Submit Event' : 'Create Event'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody py='1'>
                <div>
                  {next
                    ? 'Please provide presentation details:'
                    : 'Would you like to create a new event on '}
                  {next ? (
                    <div>
                      <Field name='title'>
                        {({ field, form }) => (
                          <FormControl
                            mt='1'
                            isInvalid={form.errors.title && form.touched.title}
                          >
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <Input
                              {...field}
                              id='title'
                              placeholder='Event Title'
                            />
                            <FormErrorMessage>
                              {form.errors.title}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name='description'>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.description &&
                              form.touched.description
                            }
                          >
                            <FormLabel htmlFor='description'>
                              Description
                            </FormLabel>
                            <Textarea
                              {...field}
                              id='description'
                              placeholder='Event description'
                            />
                            <FormErrorMessage>
                              {form.errors.description}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name='link'>
                        {({ field, form }) => (
                          <FormControl
                            mt='1'
                            isInvalid={form.errors.link && form.touched.link}
                          >
                            <FormLabel htmlFor='link'>
                              Presentation Link
                            </FormLabel>
                            <Input
                              {...field}
                              id='link'
                              placeholder='Presentation link'
                            />
                            <FormErrorMessage>
                              {form.errors.link}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                  ) : (
                    <div>
                      <Text fontWeight='semibold' as='span'>
                        {props.event.start && props.event.start.toDateString()}
                      </Text>
                      {' from '}
                      <Text fontWeight='semibold' as='span'>
                        {props.event.start &&
                          props.event.start.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}
                      </Text>
                      {' to '}
                      <Text fontWeight='semibold' as='span'>
                        {props.event.end &&
                          props.event.end.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}
                        {'?'}
                      </Text>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button size='sm' onClick={() => closeModal()}>
                    Cancel
                  </Button>
                  {next ? (
                    <ButtonGroup>
                      <Button
                        size='sm'
                        colorScheme='blue'
                        onClick={() => setNext(!next)}
                      >
                        Back
                      </Button>
                      <Button
                        size='sm'
                        colorScheme='green'
                        type='submit'
                        isLoading={isSubmitting}
                      >
                        Submit
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <Button
                      size='sm'
                      colorScheme='green'
                      type='reset'
                      onClick={() => setNext(!next)}
                    >
                      Next
                    </Button>
                  )}
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
