import React, { useCallback } from 'react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
// Chakra UI
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
  Select,
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
  asyncAddOpportunity,
  asyncDeleteOpportunity,
  asyncEditOpportunity,
  resetFormStatus,
} from '../features/companyStall/stallSlice';

const validationSchema = Yup.object({
  type: Yup.string()
    .oneOf(['Internship', 'Graduate'])
    .required('Opportunity Type is Required'),
  role: Yup.string().required('Opportunity Role Title is Required').max(64),
  location: Yup.string().required('Opportunity Location is Required').max(64),
  wam: Yup.string().oneOf([
    'Pass',
    'Credit',
    'Distinction',
    'High Distinction',
    'None',
  ]),
  expiry: Yup.date()
    .required('Application Expiry Date is Required')
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'Expiry date cannot be before today'
    ),
  link: Yup.string()
    .matches(/^http(s)?:.*$/, 'Application URL is invalid')
    .max(128),
  description: Yup.string().max(512),
});

export function OpportunityModal(props) {
  const [deletePending, setDeletePending] = React.useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const formStatus = useSelector((state) => state.stall.formStatus);

  const initialValues = {
    type: props.type || '',
    role: props.role || '',
    location: props.location || '',
    wam: props.wam || '',
    expiry: props.expiry ? new Date(props.expiry) : new Date(),
    link: props.link || '',
    description: props.description || '',
  };

  const closeModal = useCallback(() => {
    props.onClose();
    setDeletePending(false);
  }, [props]);

  React.useEffect(() => {
    if (formStatus === 'Completed') {
      closeModal();
      dispatch(resetFormStatus());
    }
  }, [dispatch, closeModal, formStatus]);

  const deleteOpportunity = () => {
    dispatch(asyncDeleteOpportunity({ id: props.id, toast: toast }));
  };

  const submitForm = (values, actions) => {
    props.edit
      ? dispatch(
          asyncEditOpportunity({
            opportunity: {
              id: props.id,
              type: values.type,
              role: values.role,
              location: values.location,
              wam: values.wam === 'None' ? null : values.wam,
              expiry: new Date(values.expiry).getTime(),
              link: values.link,
              description: values.description,
            },
            toast: toast,
          })
        )
      : dispatch(
          asyncAddOpportunity({
            opportunity: {
              type: values.type,
              role: values.role,
              location: values.location,
              wam: values.wam === 'None' ? null : values.wam,
              expiry: new Date(values.expiry).getTime(),
              link: values.link,
              description: values.description,
            },
            toast: toast,
          })
        );
  };

  return (
    <Modal isOpen={props.isOpen} size='xl' onClose={() => closeModal()}>
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
                {props.edit ? 'Edit Opportunity' : 'Add Opportunity'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={2}>
                <Field name='type'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.type && form.touched.type}
                    >
                      <FormLabel htmlFor='type'>Role Type</FormLabel>
                      <Select {...field} id='type' placeholder='Select Option'>
                        <option value='Internship'>Internship</option>
                        <option value='Graduate'>Graduate</option>
                      </Select>
                      <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='role'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.role && form.touched.role}
                    >
                      <FormLabel htmlFor='role'>Role Title</FormLabel>
                      <Input {...field} id='role' placeholder='Role Title' />
                      <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='location'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.location && form.touched.location}
                    >
                      <FormLabel htmlFor='location'>Location</FormLabel>
                      <Input {...field} id='location' placeholder='Location' />
                      <FormErrorMessage>
                        {form.errors.location}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='wam'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.wam && form.touched.wam}
                    >
                      <FormLabel htmlFor='wam'>WAM Requirement</FormLabel>
                      <Select {...field} id='wam' placeholder='Select Option'>
                        <option value='None'>None</option>
                        <option value='Pass'>Pass</option>
                        <option value='Credit'>Credit</option>{' '}
                        <option value='Distinction'>Distinction</option>
                        <option value='High Distinction'>
                          High Distinction
                        </option>
                      </Select>
                      <FormErrorMessage>{form.errors.wam}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='expiry'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.expiry && form.touched.expiry}
                    >
                      <FormLabel htmlFor='expiry'>
                        Application Expiry Date
                      </FormLabel>
                      <SingleDatepicker
                        {...field}
                        date={form.values.expiry}
                        onDateChange={(date) => setFieldValue('expiry', date)}
                        name='expiry'
                        id='expiry'
                        placeholder='Application Expiry Date'
                      />
                      <FormErrorMessage>{form.errors.expiry}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='link'>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.link && form.touched.link}
                    >
                      <FormLabel htmlFor='link'>Application Link</FormLabel>
                      <Input
                        {...field}
                        id='link'
                        placeholder='Application link'
                      />
                      <FormErrorMessage>{form.errors.link}</FormErrorMessage>
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
                        Opportunity Description
                      </FormLabel>
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
                      Are you sure you want to delete this opportunity?
                    </Text>
                    <ButtonGroup>
                      <Button mr='1' onClick={() => closeModal()}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme='orange'
                        mr='1'
                        onClick={() => setDeletePending(false)}
                      >
                        Back
                      </Button>
                      <Button
                        colorScheme='red'
                        onClick={() => deleteOpportunity()}
                        isLoading={formStatus === 'Pending'}
                        loadingText='Deleting'
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Flex>
                )}
                {!deletePending && (
                  <Button
                    colorScheme='blue'
                    isLoading={formStatus === 'Pending'}
                    loadingText={props.edit ? 'Saving' : 'Submitting'}
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
