import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { SiGooglecalendar } from 'react-icons/si';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { FaListAlt } from 'react-icons/fa';
import opportunityTable from './opportunityTable.png';

export default function AboutUs() {
  const featureTitle = [
    'Opportunities Table',
    'Presentation Calendar',
    'Q & A Forum',
  ];
  const featureImage = [opportunityTable, opportunityTable, opportunityTable];
  const featureDescription = [
    'A table detailing the various company internship and graduate career opportunities',
    'A calendar highlighting the scheduling of company career presentation events ',
    'A question and answer forum for students to ask any question and for employers to answer them',
  ];
  const [index, setIndex] = React.useState(0);

  const Feature = ({ text, icon, iconBg, idx }) => {
    return (
      <Stack
        direction={'row'}
        align={'center'}
        as={Button}
        bg='none'
        _hover={{ bg: 'blue.50' }}
        justify='flex-start'
        p='0'
        onClick={() => setIndex(idx)}
      >
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  return (
    <Container maxW={'7xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            Our Features
          </Text>
          <Heading
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '30%',
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'blue.50',
              zIndex: -1,
            }}
          >
            {featureTitle[index]}
          </Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            {featureDescription[index]}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature
              icon={<Icon as={FaListAlt} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={featureTitle[0]}
              idx={0}
            />
            <Feature
              icon={
                <Icon as={SiGooglecalendar} color={'orange.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('orange.100', 'orange.900')}
              text={featureTitle[1]}
              idx={1}
            />
            <Feature
              icon={
                <Icon
                  as={RiQuestionAnswerFill}
                  color={'green.500'}
                  w={5}
                  h={5}
                />
              }
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={featureTitle[2]}
              idx={2}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'image of ' + featureTitle[index]}
            src={featureImage[index]}
            objectFit={'scale-down'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
