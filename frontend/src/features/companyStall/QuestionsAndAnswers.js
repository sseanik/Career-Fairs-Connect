import React from 'react';
// Chakra UI
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { asyncPostQuestion } from './stallSlice';

export function QuestionsAndAnswers(props) {
  const [question, setQuestion] = React.useState('');
  const dispatch = useDispatch();
  const buttonLoading = useSelector((state) => state.stall.status);
  const toast = useToast();

  const postQuestion = () => {
    question &&
      dispatch(asyncPostQuestion({ question: question, toast: toast }));
  };

  return (
    <Box>
      <Text mb='8px' fontWeight='semibold'>
        Submit your Question:
      </Text>
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        size='sm'
      />
      <Button
        size='sm'
        mt='2'
        mb='4'
        onClick={() => postQuestion()}
        isLoading={buttonLoading}
        loadingText='Submitting'
        spinnerPlacement='end'
      >
        Submit
      </Button>

      <Accordion allowMultiple>
        {props.qandas.map((qanda, idx) => (
          <AccordionItem isDisabled={!qanda.answer} key={`qanda-${idx}`}>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left' fontWeight='semibold'>
                  {qanda.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{qanda.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
