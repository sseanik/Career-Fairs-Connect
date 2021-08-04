import React from 'react';
// Chakra
import {
  Box,
  Center,
  Flex,
  Skeleton,
  SkeletonCircle,
  Spacer,
} from '@chakra-ui/react';

export const SkeletonStallCard = () => {
  return (
    <Box
      borderWidth='1px'
      borderColor='gray.300'
      w='225px'
      borderRadius='xl'
      p='12px'
      m='2'
      role='group'
    >
      <Center borderRadius='xl' borderColor='white'>
        <SkeletonCircle my='14px' h='180px' w='180px' />
      </Center>
      <Box pt='15px' px='0px' borderTopWidth='1px'>
        <Box d='flex' alignItems='center'>
          <Flex fontWeight='semibold' fontSize='lg' ml='2' w='100%' p='1'>
            <Skeleton height='20px' w='100px' />
            <Spacer />
            <SkeletonCircle h='15px' w='15px' mt='1' />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
