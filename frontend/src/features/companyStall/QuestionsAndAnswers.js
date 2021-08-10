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
import { asyncDeleteQuestion, asyncPostQuestion } from './stallSlice';
import { QuestionModal } from '../../components/QuestionModal';
import { AnswerModal } from '../../components/AnswerModal';
import { RiPencilFill } from 'react-icons/ri';

export function QuestionsAndAnswers(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isQuestion, setIsQuestion] = React.useState(true);
  const [question, setQuestion] = React.useState('');
  const [modalAnswer, setModalAnswer] = React.useState('');
  const [firstAnswer, setFirstAnswer] = React.useState(true);
  const [id, setId] = React.useState('');
  const buttonLoading = useSelector((state) => state.stall.status);
  const toast = useToast();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userID);
  const companyId = useSelector((state) => state.user.companyID);

  const postQuestion = () => {
    question &&
      dispatch(
        asyncPostQuestion({
          id: props.stallID,
          question: {
            question: question,
          },
          toast: toast,
        })
      );
    setQuestion('');
  };

  const deleteQuestion = (id) => {
    id &&
      dispatch(
        asyncDeleteQuestion({
          stallId: props.stallID,
          postId: id,
          toast: toast,
        })
      );
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {isQuestion ? (
          <QuestionModal
            isOpen={isOpen}
            stallId={props.stallID}
            questionId={id}
            onClose={onClose}
            question={question}
            setQuestion={setQuestion}
          />
        ) : (
          <AnswerModal
            isOpen={isOpen}
            stallId={props.stallID}
            questionId={id}
            onClose={onClose}
            answer={modalAnswer}
            setAnswer={setModalAnswer}
            firstAnswer={firstAnswer}
          />
        )}
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
          colorScheme='green'
        >
          Submit
        </Button>
        <Accordion allowMultiple>
          {props.qandas.map((qanda, idx) => (
            <AccordionItem
              isDisabled={!qanda.answer && companyId !== props.companyID}
              key={`qanda-${idx}`}
            >
              <Flex align='center'>
                <AccordionButton as='div'>
                  <Box flex='1' textAlign='left' fontWeight='semibold'>
                    {qanda.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                {userId === qanda.author_id ? (
                  <>
                    <Button
                      leftIcon={<RiPencilFill />}
                      size='sm'
                      onClick={() => {
                        setQuestion(qanda.question);
                        setId(qanda.id);
                        setIsQuestion(true);
                        onOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme='red'
                      size='sm'
                      ml='3'
                      onClick={() => {
                        deleteQuestion(qanda.id);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <> </>
                )}
              </Flex>
              <AccordionPanel pb={4}>
                {!qanda.answer ? (
                  <Flex>
                    <Box>{qanda.answer}</Box>
                    {companyId === props.companyID ? (
                      <Button
                        leftIcon={<RiPencilFill />}
                        size='sm'
                        onClick={() => {
                          setModalAnswer(qanda.answer);
                          setId(qanda.id);
                          setIsQuestion(false);
                          setFirstAnswer(true);
                          onOpen();
                        }}
                      >
                        Answer Question
                      </Button>
                    ) : (
                      <> </>
                    )}
                  </Flex>
                ) : (
                  <Flex>
                    <Box pr='10px'>{qanda.answer}</Box>
                    {companyId === props.companyID ? (
                      <Button
                        leftIcon={<RiPencilFill />}
                        align='right'
                        size='sm'
                        ml='auto'
                        onClick={() => {
                          setModalAnswer(qanda.answer);
                          setId(qanda.id);
                          setIsQuestion(false);
                          setFirstAnswer(false);
                          onOpen();
                        }}
                      >
                        Edit
                      </Button>
                    ) : (
                      <> </>
                    )}
                  </Flex>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </div>
  );
}
