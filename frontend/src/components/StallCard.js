import React from 'react';
import { Link } from 'react-router-dom';
// Chakra UI
import { Badge, Box, Image, Spacer, Tooltip } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

export function StallCard(props) {
  return (
    <Box
      borderWidth='1px'
      borderColor='gray.300'
      w='225px'
      borderRadius='xl'
      p='12px'
      m='2'
      role='group'
      _hover={{ background: 'gray.100' }}
      as={Link}
      to={`/stall/${props.id}`}
    >
      <Box borderRadius='xl' borderColor='white'>
        <Image
          px='10px'
          src={props.img}
          alt={props.name + ' Logo'}
          objectFit='scale-down'
          h='225px'
        />
      </Box>
      <Box pt='10px' px='5px' borderTopWidth='1px'>
        <Box d='flex' alignItems='center'>
          {props.isLive && (
            <Badge
              borderRadius='lg'
              px='2'
              alignItems='center'
              colorScheme='green'
              fontSize='sm'
              variant='solid'
            >
              Live
            </Badge>
          )}

          <Box
            fontWeight='semibold'
            fontSize='lg'
            ml='2'
            _groupHover={{ fontWeight: 'bold' }}
          >
            {props.name}
          </Box>
          <Spacer />
          <Tooltip label={props.description} fontSize='md'>
            <InfoOutlineIcon color='gray.600' />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
