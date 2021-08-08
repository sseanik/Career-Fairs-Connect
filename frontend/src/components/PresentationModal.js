import React, { useCallback } from 'react';
// Chakra UI
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
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
  asyncDeletePresentation,
  asyncEditPresentation,
  resetEventFormStatus,
} from '../features/companyStall/stallSlice';

const validationSchema = Yup.object({
  title: Yup.string().required('Presentation Title is Required').max(128),
  description: Yup.string()
    .required('Presentation Description is Required')
    .max(512),
  link: Yup.string()
    .matches(/^http(s)?:.*$/, 'Presentation URL is invalid')
    .required('Presentation Link is Required')
    .max(256),
});

export function PresentationModal(props) {
  const color = props.color.replace(' ', '');
  const rgb = color.substring(4, color.length - 1).split(' ');
  const [editStatus, setEditStatus] = React.useState(false);
  const [deleteStatus, setDeleteStatus] = React.useState(false);
  const eventFormStatus = useSelector((state) => state.stall.eventFormStatus);
  const dispatch = useDispatch();
  const toast = useToast();

  const initialValues = {
    title: props.title,
    description: props.description,
    link: props.link,
  };

  const closeModal = useCallback(() => {
    setEditStatus(false);
    setDeleteStatus(false);
    props.onClose();
  }, [props]);

  React.useEffect(() => {
    if (eventFormStatus === 'Completed') {
      closeModal();
      setEditStatus(false);
      setDeleteStatus(false);
      dispatch(resetEventFormStatus());
    }
  }, [dispatch, closeModal, eventFormStatus]);

  const conditionalDelete = () => {
    dispatch(asyncDeletePresentation({ id: props.id, toast: toast }));
  };

  const submitForm = (values, actions) => {
    dispatch(
      asyncEditPresentation({
        presentation: {
          title: values.title,
          presentation_description: values.description,
          presentation_link: values.link,
          start_time: props.start,
          end_time: props.end,
          color: props.color,
          stall_id: props.stallID,
        },
        toast: toast,
      })
    );
    actions.setSubmitting(false);
  };

  return (
    <Modal onClose={() => closeModal()} isOpen={props.isOpen} isCentered>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => submitForm(values, actions)}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader m='0' pb='0'>
                {editStatus ? 'Edit Presentation Details' : props.title}
                <Text m='0' pb='1' color='gray.500' fontSize='sm'>
                  {!editStatus && props.time}
                </Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody py='2'>
                {!editStatus ? (
                  props.description
                ) : (
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
                            form.errors.description && form.touched.description
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
                )}
              </ModalBody>
              <ModalFooter>
                <Flex direction='column' align='flex-end' p='0'>
                  {deleteStatus && (
                    <Text fontSize='sm' color='red' mb='2'>
                      Are you sure you want to delete this presentation event?
                    </Text>
                  )}
                  <ButtonGroup>
                    <Button onClick={() => closeModal()} size='sm'>
                      Close
                    </Button>
                    {props.edit && (
                      <ButtonGroup>
                        {deleteStatus && (
                          <Button
                            size='sm'
                            colorScheme='blue'
                            onClick={() => setDeleteStatus(!deleteStatus)}
                          >
                            Back
                          </Button>
                        )}
                        {!editStatus && (
                          <Button
                            onClick={() =>
                              !deleteStatus
                                ? setDeleteStatus(!deleteStatus)
                                : conditionalDelete()
                            }
                            size='sm'
                            colorScheme={editStatus ? 'blue' : 'red'}
                            isLoading={eventFormStatus === 'Pending'}
                            loadingText='Deleting'
                          >
                            {editStatus ? 'Back' : 'Delete'}
                          </Button>
                        )}
                        {!deleteStatus && (
                          <Button
                            onClick={() => setEditStatus(!editStatus)}
                            size='sm'
                            colorScheme={editStatus ? 'blue' : 'orange'}
                          >
                            {editStatus ? 'Back' : 'Edit'}
                          </Button>
                        )}
                      </ButtonGroup>
                    )}
                    {editStatus && (
                      <Button
                        size='sm'
                        colorScheme='green'
                        isLoading={eventFormStatus === 'Pending'}
                        loadingText='Saving'
                        type='submit'
                      >
                        Save
                      </Button>
                    )}
                    {!deleteStatus && !editStatus && (
                      <Button
                        as={Link}
                        href={props.link}
                        isExternal
                        bg={color}
                        _hover={{ bg: color }}
                        color={
                          rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186
                            ? 'black'
                            : 'white'
                        }
                        size='sm'
                      >
                        Go to Presentation
                      </Button>
                    )}
                  </ButtonGroup>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
