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
  useDisclosure,
  Flex,
  Modal,
  ModalOverlay,
} from '@chakra-ui/react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { asyncAnswerQuestion, asyncDeleteQuestion, asyncPostQuestion } from './stallSlice';
import { QuestionModal } from '../../components/QuestionModal';
import { AnswerModal } from '../../components/AnswerModal';

import { RiPencilFill } from 'react-icons/ri';

export function QuestionsAndAnswers(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isQuestion, setIsQuestion] = React.useState(true)
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [id, setId] = React.useState('');
  const buttonLoading = useSelector((state) => state.stall.status);
  const toast = useToast();
  const dispatch = useDispatch();

  const postQuestion = () => {
    question &&
      dispatch(asyncPostQuestion({ id: props.stallID,
        question: {
          question: question
        },
        toast: toast }));
  };

  const postAnswer = (id) => {
    answer &&
      dispatch(asyncAnswerQuestion({id: id, answer: answer, toast: toast}))
      .then(setAnswer(''))
  }

  const deleteQuestion = (id) => {
    id &&
      dispatch(asyncDeleteQuestion({id: id, toast: toast}))
  }

  return (
    <div>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {isQuestion ?
      <QuestionModal
          isOpen={isOpen}
          id={id}
          onClose={onClose}
          question={question}
          setQuestion={setQuestion}
      />
      :
      <AnswerModal
        isOpen={isOpen}
        id={id}
        onClose={onClose}
        answer={answer}
        setAnswer={setAnswer}
      />
      }
    </Modal>
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
          /*Change (9 != 9) to userId != stall.companyId*/
          <AccordionItem isDisabled={!qanda.answer && (9 != 9)} key={`qanda-${idx}`}>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left' fontWeight='semibold'>
                  {qanda.question}
                  {/*Change this so that this button only shows if qanda.creatorId == currentUserId*/}
                  
                  { (qanda.creatorId === '0') ?
                    <>
                      <Button
                      leftIcon={<RiPencilFill />}
                      size='sm'
                      ml='3'
                      onClick={() => {
                        setQuestion(qanda.question);
                        setId(qanda.id);
                        setIsQuestion(true)
                        onOpen();
                      }}
                      >
                        Edit
                      </Button>
                      <Button
                        bg='red'
                        color='white'
                        marginLeft="100%"
                        size='sm'
                        ml='3'
                        onClick={() => {
                          setId(qanda.id);
                          deleteQuestion(id);
                        }}
                      >
                        Delete
                      </Button>
                    </>
                   :
                  <> </>}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              
              {!qanda.answer ?
              <>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                size='sm'
              />
              <Button
                size='sm'
                mt='2'
                mb='4'
                onClick={() => {
                  postAnswer(qanda.id)
                }}
                isLoading={buttonLoading}
                loadingText='Submitting'
                spinnerPlacement='end'
              >
                Submit
              </Button></>
            :
            <Flex>
              <Box>
                {qanda.answer}
              </Box>
              {/*Change (9 != 9) to userId != stall.companyId*/}
              {(9 == 9) ?
              <Button
                leftIcon={<RiPencilFill />}
                marginLeft="100%"
                size='sm'
                ml='3'
                onClick={() => {
                  setAnswer(qanda.answer);
                  setId(qanda.id);
                  setIsQuestion(false)
                  onOpen();
                }}
              >
                Edit
              </Button>
                :
                <> </>
              }
            </Flex>
            }
             </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
    </div>
  );
}
