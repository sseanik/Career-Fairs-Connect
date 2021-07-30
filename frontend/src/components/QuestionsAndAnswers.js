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
} from '@chakra-ui/react';

export function QuestionsAndAnswers(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box>
      <Text mb='8px' fontWeight='semibold'>
        Submit your Question:
      </Text>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size='sm'
      />
      <Button size='sm' mt='2' mb='4'>
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
