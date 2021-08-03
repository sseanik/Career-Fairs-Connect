import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
  Heading,
} from '@chakra-ui/react';
import { IoSchoolSharp } from 'react-icons/io5';
import { FaUniversity, FaBuilding } from 'react-icons/fa';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function ThreeColumnBlurb() {
  return (
    <Container maxW={'7xl'} pb='10'>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        mt={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Box p={4}>
          <Flex mb='8' justify='center'>
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
              Who can use the Platform?
            </Heading>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FaUniversity} color='black' w={10} h={10} />}
              title={'Universities'}
              text={
                'A University can host multiple types of Careers Fair Event for companies to create virtual stalls in and for their university students to explore and find relevant career opportunities'
              }
            />
            <Feature
              icon={<Icon as={FaBuilding} color='black' w={10} h={10} />}
              title={'Employers'}
              text={
                'Employers can apply a virtual stall in a University Careers fair event to promote their career opportunities and schedule any accompanying live presentations.'
              }
            />
            <Feature
              icon={<Icon as={IoSchoolSharp} color='black' w={10} h={10} />}
              title={'Students'}
              text={
                'Students can explore their University Career Fair Events and the participating company stalls to learn about the opportunities available for different companies and ask any questions they might have.'
              }
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </Container>
  );
}
