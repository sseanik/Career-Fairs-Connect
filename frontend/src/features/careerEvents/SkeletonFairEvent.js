// A Fair event template for data mapping

import React from 'react';
// Chakra
import { Flex, Skeleton, Stack, useColorMode } from '@chakra-ui/react';

export const SkeletonFairEvent = (props) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      borderWidth={props.card && '1px'}
      borderColor={
        props.card && colorMode === 'light' ? 'gray.300' : 'gray.700'
      }
      borderRadius={props.card && 'xl'}
      p={props.card && '12px'}
      mx={props.card && '5'}
      my={props.card && '3'}
    >
      <Skeleton h='125px' w='175px' />

      <Stack ml='5' width='80%' spacing='3'>
        <Skeleton height='20px' w='25%' mt='2' />
        <Skeleton height='11px' w='20%' />
        <Skeleton height='18px' />
        <Skeleton height='15px' w='8%' />
      </Stack>
    </Flex>
  );
};
