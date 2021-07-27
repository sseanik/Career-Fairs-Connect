import { Badge, Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';

export function FairDetails() {
  return (
    <Flex p='1'>
      <Image
        src='https://www.unsw.edu.au/etc/clientlibs/unsw-common/unsw-assets/img/social/UNSWlogo-opengraph-squaresafe.png'
        alt='yo'
        pr='5'
        maxHeight='100px'
      />
      <Box>
        <Box pb='1' fontWeight='semibold' fontSize='lg'>
          UNSW Winter 2021 Virtual Careers Fair
        </Box>

        <Box d='flex' alignItems='baseline' pb='1'>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
          >
            10th July - 27th July
            <Badge variant='subtle' colorScheme='green' fontSize='xs' ml='2'>
              Active
            </Badge>
          </Box>
        </Box>

        <Box>
          UNSW is hosting a Virtual Careers Fair highlighting companies with
          opportunities in technology. Students are encouraged to view each
          company's presentations and ask any questions or queries they have
          regarding the company and their opportunities.
        </Box>
      </Box>
    </Flex>
  );
}
