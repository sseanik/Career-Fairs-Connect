import React from 'react';
import { Link } from 'react-router-dom';
// Chakra UI
import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Tag,
  TagLabel,
  Tooltip,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { asyncToggleEventPending } from '../features/careerFair/fairSlice';
import { useDispatch, useSelector } from 'react-redux';

export function StallCard(props) {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.role);

  return (
    <Flex direction='column'>
      <Box
        zIndex='1'
        borderWidth='1px'
        borderColor='gray.300'
        w='225px'
        borderRadius='xl'
        p='12px'
        m='2'
        role='group'
        bg={props.pending && 'gray.100'}
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
            {props.pending ? (
              <Tag size='md' variant='solid'>
                <TagLabel>Pending</TagLabel>
              </Tag>
            ) : (
              <Tooltip label={props.description} fontSize='md'>
                <InfoOutlineIcon color='gray.600' />
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
      {userRole === 'University' && (
        <Box
          borderBottomWidth='1px'
          borderLeftWidth='1px'
          borderRightWidth='1px'
          borderColor='gray.300'
          zIndex='0'
          borderRadius='xl'
          bg={props.pending && 'gray.100'}
          w='225px'
          px='12px'
          mt='-8'
          mx='2'
          pt='8'
          pb='2'
          mb='2'
        >
          <Button
            w='100%'
            size='sm'
            fontSize='md'
            colorScheme={props.pending ? 'green' : 'gray'}
            onClick={() =>
              props.pending
                ? dispatch(asyncToggleEventPending(props.id))
                : dispatch(asyncToggleEventPending(props.id))
            }
          >
            {props.pending ? 'Approve' : 'Set Pending'}
          </Button>
        </Box>
      )}
    </Flex>
  );
}
