import React from 'react';

// Chakra UI
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
// Formik

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { asyncEditQuestion } from '../features/companyStall/stallSlice';

export function QuestionModal(props) {
  const buttonLoading = useSelector((state) => state.stall.status);
  const dispatch = useDispatch();
  const toast = useToast();

  const editQuestion = () => {
    props.question &&
      dispatch(asyncEditQuestion({ id: props.id, question: props.question, toast: toast }));
  };

  const submitForm = () => {
    editQuestion({
    qandas: {
      id: props.id,
      question: props.question
    },
    toast: toast
    })
    props.setQuestion("");
    props.onClose();
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Text mb='8px' fontWeight='semibold'>
            Edit your Question:
          </Text>
          <Textarea
            value={props.question}
            onChange={(e) => props.setQuestion(e.target.value)}
            size='sm'
          />
          <Button
            size='sm'
            mt='2'
            mb='4'
            onClick={() => submitForm()}
            isLoading={buttonLoading}
            loadingText='Submitting'
            spinnerPlacement='end'
          >
            Submit
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
}