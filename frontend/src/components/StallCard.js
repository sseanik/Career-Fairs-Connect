import React from 'react';
import { Badge, Box, Image, Spacer, Tooltip } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { prominent } from 'color.js';

export function StallCard(props) {
  const [dominantColour, setDominantColour] = React.useState('white');

  // When a logo has a non white/black background, the dominant colour is used to colour in the rest
  React.useEffect(() => {
    prominent(props.img, {
      amount: 1,
    }).then((color) => {
      setDominantColour(
        // Always set rgb(0, 0, 0) to a white background, since transparency results in rgb(0, 0, 0)
        color[0] + color[1] + color[2] === 0
          ? 'white'
          : 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
      );
    });
  }, [props.img]);

  return (
    <Box
      borderWidth='1px'
      borderColor='gray.300'
      w='225px'
      as='button'
      borderRadius='xl'
      p='12px'
      m='2'
      role='group'
      _hover={{ background: 'gray.100' }}
    >
      <Box borderRadius='xl' borderColor='white' bgColor={dominantColour}>
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
