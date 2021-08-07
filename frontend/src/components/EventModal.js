import React from 'react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useHistory } from 'react-router-dom';
// Chakra
import {
  Button,
  ButtonGroup,
  Flex,
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
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncCreateFairEvent,
  asyncDeleteFairEvent,
  resetEvents,
} from '../features/careerEvents/eventsSlice';
import { asyncEditFairEvent } from '../features/careerFair/fairSlice';

const validationSchema = Yup.object({
  title: Yup.string().required('Event Title is Required').max(126),
  description: Yup.string().required('Event Description is Required').max(512),
  start: Yup.date()
    .required('Start Date is Required')
    .max(Yup.ref('end'), 'Start date cannot be After End Date')
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'Start date cannot be before today'
    ),
  end: Yup.date()
    .required('End Date is Required')
    .min(Yup.ref('start'), 'End date cannot be Before Start Date')
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'Start date cannot be before today'
    ),
});

export function EventModal(props) {
  const [deletePending, setDeletePending] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const universityID = useSelector((state) => state.user.universityID);

  const toast = useToast();

  const initialValues = {
    title: props.title || '',
    description: props.description || '',
    start: props.start ? new Date(props.start) : new Date(),
    end: props.end
      ? new Date(props.end)
      : new Date(new Date().setDate(new Date().getDate() + 1)),
  };

  const closeModal = () => {
    props.onClose();
    setDeletePending(false);
  };

  const deleteEvent = () => {
    dispatch(asyncDeleteFairEvent({ id: props.id, toast: toast }));
    dispatch(resetEvents());
    history.push('/events');
  };

  const submitForm = (values, actions) => {
    props.edit
      ? dispatch(
          asyncEditFairEvent({
            event: {
              title: values.title,
              description: values.description,
              start: values.start.getTime(),
              end: values.end.getTime(),
            },
            toast: toast,
          })
        )
      : dispatch(
          asyncCreateFairEvent({
            event: {
              title: values.title,
              description: values.description,
              start_date: values.start,
              end_date: values.end,
              university_id: universityID,
            },
            toast: toast,
            id: universityID,
          })
        );
    actions.setSubmitting(false);
    closeModal();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={() => closeModal()}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => submitForm(values, actions)}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {props.edit
                  ? 'Edit Career Fair Event'
                  : 'Create Career Fair Event'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={2}>
                <Field name='title'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel htmlFor='title'>Title</FormLabel>
                      <Input {...field} id='title' placeholder='Event Title' />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='description'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
                      <FormLabel htmlFor='description'>Description</FormLabel>
                      <Textarea
                        {...field}
                        id='description'
                        placeholder='Event Description'
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='start'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.start && form.touched.start}
                    >
                      <FormLabel htmlFor='start'>Start Date</FormLabel>
                      <SingleDatepicker
                        {...field}
                        date={form.values.start}
                        onDateChange={(date) => setFieldValue('start', date)}
                        name='start'
                        id='start'
                        placeholder='start'
                      />
                      <FormErrorMessage>{form.errors.start}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='end'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.end && form.touched.end}
                    >
                      <FormLabel htmlFor='end'>End Date</FormLabel>
                      <SingleDatepicker
                        {...field}
                        date={form.values.end}
                        onDateChange={(date) => setFieldValue('end', date)}
                        name='end'
                        id='end'
                        placeholder='end'
                      />
                      <FormErrorMessage>{form.errors.end}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                {!deletePending && (
                  <Button mr={3} onClick={props.onClose}>
                    Cancel
                  </Button>
                )}
                {!deletePending && props.edit && (
                  <Button
                    colorScheme='red'
                    mr={3}
                    onClick={() => setDeletePending(!deletePending)}
                  >
                    Delete
                  </Button>
                )}
                {deletePending && (
                  <Flex direction='column' align='flex-end'>
                    <Text color='red' mb='2'>
                      Are you sure you want to delete this event?
                    </Text>
                    <ButtonGroup>
                      <Button mr='1' onClick={() => setDeletePending(false)}>
                        Cancel
                      </Button>
                      <Button colorScheme='red' onClick={() => deleteEvent()}>
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Flex>
                )}
                {!deletePending && (
                  <Button
                    colorScheme='blue'
                    isLoading={isSubmitting}
                    type='submit'
                  >
                    {props.edit ? 'Save' : 'Submit'}
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
