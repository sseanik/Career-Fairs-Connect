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
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { SiGooglecalendar } from 'react-icons/si';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { FaListAlt } from 'react-icons/fa';
import opportunityTable from './opportunityTable.png';
import presentationCalendar from './presentationCalendar.png';
import qandaForum from './qandaForum.png';
import { Fade } from 'react-awesome-reveal';

export default function AboutUs() {
  const featureTitle = [
    'Opportunities Table',
    'Presentation Calendar',
    'Q & A Forum',
  ];
  const featureImage = [opportunityTable, presentationCalendar, qandaForum];
  const featureDescription = [
    'A table detailing the various company internship and graduate career opportunities',
    'A calendar highlighting the scheduling of company career presentation events ',
    'A question and answer forum for students to ask any question and for employers to answer them',
  ];
  const [index, setIndex] = React.useState(0);

  const { colorMode } = useColorMode();
  const [colour, setColour] = React.useState('');

  React.useEffect(() => {
    colorMode === 'light' ? setColour('blue.50') : setColour('blue.900');
  }, [colorMode]);

  const Feature = ({ text, icon, iconBg, idx, color }) => {
    return (
      <Stack
        direction={'row'}
        align={'center'}
        as={Button}
        bg='none'
        _hover={{ bg: useColorModeValue('blue.50', 'blue.900') }}
        justify='flex-start'
        p='0'
        onClick={() => {
          setIndex(idx);
          setColour(color);
        }}
      >
        <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  return (
    <Container maxW={'7xl'} py={12} px={{ base: 10, md: 10 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Fade up duration={800}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              bg={colour}
              fontWeight={600}
              fontSize={'sm'}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}
            >
              Features
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
                bg: colour,
                zIndex: -1,
              }}
            >
              {featureTitle[index]}
            </Heading>
            <Text fontSize={'lg'}>{featureDescription[index]}</Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }
            >
              <Feature
                icon={<Icon as={FaListAlt} color={'red.500'} w={5} h={5} />}
                iconBg={useColorModeValue('red.100', 'red.900')}
                text={featureTitle[0]}
                idx={0}
                color={useColorModeValue('red.50', 'red.900')}
              />
              <Feature
                icon={
                  <Icon
                    as={SiGooglecalendar}
                    color={'yellow.500'}
                    w={5}
                    h={5}
                  />
                }
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={featureTitle[1]}
                idx={1}
                color={useColorModeValue('yellow.50', 'yellow.900')}
              />
              <Feature
                icon={
                  <Icon
                    as={RiQuestionAnswerFill}
                    color={'teal.500'}
                    w={5}
                    h={5}
                  />
                }
                iconBg={useColorModeValue('teal.100', 'teal.900')}
                text={featureTitle[2]}
                idx={2}
                color={useColorModeValue('teal.50', 'teal.900')}
              />
            </Stack>
          </Stack>
        </Fade>
        <Flex>
          <Fade up>
            <Image
              rounded={'md'}
              alt={'image of ' + featureTitle[index]}
              src={featureImage[index]}
              objectFit={'none'}
            />
          </Fade>
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
