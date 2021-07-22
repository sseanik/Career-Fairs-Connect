import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import useWindowDimensions from '../app/useWindowDimensions';
import { EventCalendar } from './EventCalendar';

export function UniversityInfoCard() {
  const width = useWindowDimensions().width;

  return (
    <Flex justify='center'>
      <Box
        borderWidth='1px'
        borderColor='gray.300'
        borderRadius='xl'
        m='4'
        pb='4'
        w={Math.floor(Math.ceil(width / 280) * 280, 400)}
      >
        <Grid h='400px' templateColumns='repeat(3, 1fr)' gap={4} m='10px'>
          <GridItem colSpan={0} bg='yellow'>
            <Box bg='black'></Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Box>
              <EventCalendar />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}
