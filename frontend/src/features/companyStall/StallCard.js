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
  Tooltip,
  useBreakpointValue,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { InfoIcon, InfoOutlineIcon } from '@chakra-ui/icons';
// Redux
import { asyncToggleEventPending } from '../../features/careerFair/fairSlice';
import { useDispatch, useSelector } from 'react-redux';

export function StallCard(props) {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.role);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const companyName = useSelector((state) => state.user.name);

  return (
    <Flex direction='column' justify='center' align='center'>
      <Box
        zIndex='1'
        borderWidth={companyName === props.name ? '4px' : '1px'}
        borderColor={
          companyName === props.name
            ? 'blue.400'
            : colorMode === 'light'
            ? 'gray.300'
            : 'gray.700'
        }
        w={useBreakpointValue({
          base: '90vw',
          sm: '225px',
        })}
        borderRadius='2xl'
        p='12px'
        m='2'
        role='group'
        bg={
          props.pending === 'Rejected' || props.pending === 'Pending'
            ? colorMode === 'light'
              ? 'gray.200'
              : 'gray.800'
            : colorMode === 'light'
              ? 'white'
              : 'gray.700'
        }
        _hover={{
          background:
            colorMode === 'light'
              ? 'gray.100'
              : props.pending === 'Rejected' || props.pending === 'Pending'
                ? 'gray.900'
                : 'gray.600',
        }}
        as={Link}
        to={`/stall/${props.id}`}
      >
        <Box
          borderRadius='xl'
          borderColor='white'
          justify='center'
          align='center'
        >
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
              isTruncated
            >
              {props.name}
            </Box>
            <Spacer />
            {props.pending !== 'Approved' ? (
              <Tooltip label={props.pending} fontSize='md'>
                <InfoIcon color='gray.600' />
              </Tooltip>
            ) : (
              <Tooltip label={props.description} fontSize='md'>
                <InfoOutlineIcon color='gray.600' />
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
      <Flex
        w={useBreakpointValue({
          base: '90vw',
          sm: '225px',
        })}
      >
        {userRole === 'University' && (
          <Box
            borderBottomWidth='1px'
            borderLeftWidth='1px'
            borderRightWidth='1px'
            zIndex='0'
            borderRadius='xl'
            borderColor={colorMode === 'light' ? 'gray.300' : 'gray.700'}
            bg={
              (props.pending === 'Rejected' || props.pending === 'Pending') &&
              (colorMode === 'light' ? 'gray.200' : 'gray.800')
            }
            w='100%'
            px='12px'
            mt='-8'
            pt='8'
            pb='2'
            mb='2'
            as={Flex}
            justify='space-around'
          >
            <Button
              w={props.pending !== 'Pending' ? '100%' : '45%'}
              size='sm'
              fontSize='md'
              colorScheme={props.pending === 'Pending' ? 'green' : 'gray'}
              onClick={() =>
                props.pending === 'Pending'
                  ? dispatch(
                    asyncToggleEventPending({
                      id: props.id,
                      approval_status: 'Approved',
                      toast: toast,
                    })
                  )
                  : dispatch(
                    asyncToggleEventPending({
                      id: props.id,
                      approval_status: 'Pending',
                      toast: toast,
                    })
                  )
              }
            >
              {props.pending === 'Pending' ? 'Approve' : 'Set Pending'}
            </Button>
            {props.pending === 'Pending' && (
              <Button
                w='45%'
                size='sm'
                fontSize='md'
                colorScheme='red'
                onClick={() =>
                  dispatch(
                    asyncToggleEventPending({
                      id: props.id,
                      approval_status: 'Rejected',
                      toast: toast,
                    })
                  )
                }
              >
                Reject
              </Button>
            )}
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
