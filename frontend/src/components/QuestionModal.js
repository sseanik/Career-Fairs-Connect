import React from 'react';

// Chakra UI
import {
  Button,
  ModalCloseButton,
  ModalContent,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { asyncEditQuestion } from '../features/companyStall/stallSlice';

export function QuestionModal(props) {
  const buttonLoading = useSelector((state) => state.stall.status);
  const dispatch = useDispatch();
  const toast = useToast();

  const editQuestion = () => {
    props.question &&
      dispatch(asyncEditQuestion({ questionId: props.questionId, stallId: props.stallId,
      question: {
        question: props.question
      }, toast: toast }));
  };

  const submitForm = () => {
    editQuestion({
    qandas: {
      questionId: props.questionId,
      stallId: props.stallId,
      question: props.question
    },
    toast: toast
    })
    props.setQuestion("");
    props.onClose();
  }

  return (
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
  )
}