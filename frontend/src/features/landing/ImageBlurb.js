import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import expobg from './expobg.png';

export default function ImageBlurb() {
  return (
    <Flex
      w={'full'}
      h={'50vh'}
      backgroundImage={expobg}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      mt='10'
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            align={'center'}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
          >
            Say goodbye to crowded rooms and the chaos of indoor venues
          </Text>
          <Stack
            w='100%'
            direction={'row'}
            as={Flex}
            align={'center'}
            justify={'center'}
          >
            <Button
              bg={'blue.400'}
              rounded={'xl'}
              color={'white'}
              _hover={{ bg: 'blue.500' }}
              as={Link}
              to='/register'
            >
              Get Started Today
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
