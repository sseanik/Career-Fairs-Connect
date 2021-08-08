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
import { asyncAnswerQuestion } from '../features/companyStall/stallSlice';

export function AnswerModal(props) {
  const buttonLoading = useSelector((state) => state.stall.status);
  const dispatch = useDispatch();
  const toast = useToast();

  const editAnswer = () => {
    console.log(props)
    props.answer &&
      dispatch(asyncAnswerQuestion({ questionId: props.questionId, stallId: props.stallId, 
      answer: {
        answer: props.answer
      }, toast: toast }));
  };

  const submitForm = () => {
    editAnswer({
    qandas: {
      questionId: props.questionId,
      stallId: props.stallId,      
      answer: props.answer
    },
    toast: toast
    })
    props.setAnswer("");
    props.onClose();
  }

  return (
    <ModalContent>
      <ModalCloseButton />
      <Text mb='8px' fontWeight='semibold'>
        Edit your Answer:
      </Text>
      <Textarea
        value={props.answer}
        onChange={(e) => props.setAnswer(e.target.value)}
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