import {
  Button,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { prominent } from 'color.js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EventModal } from '../../components/EventModal';
import { DetailsCard } from '../../components/DetailsCard';
import Navbar from '../../components/navbar';
import { SkeletonFairEvent } from '../../components/SkeletonFairEvent';
import { asyncFetchEventsData } from './eventsSlice';
import { resetFair } from './fairSlice';
import { SmallAddIcon } from '@chakra-ui/icons';

async function getDominantColour(image) {
  const colour = await prominent(image, {
    amount: 2,
  });
  let index = -1;
  if (colour[0][0] + colour[0][1] + colour[0][2] !== 0) {
    index = 0;
  } else if (colour[1][0] + colour[1][1] + colour[1][2] !== 0) {
    index = 1;
  }
  return index !== -1
    ? `rgb(${colour[index][0]}, ${colour[index][1]}, ${colour[index][2]})`
    : 'black';
}

export default function CareerEvents() {
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Redux
  const dispatch = useDispatch();
  const eventsData = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.events.loading);
  const userDetails = useSelector((state) => state.user);

  React.useEffect(() => dispatch(asyncFetchEventsData()), [dispatch]);

  return (
    <div>
      <Navbar />
      <Flex align='center'>
        <Heading ml='6' mt='3' as='h3' size='md' fontWeight='semibold'>
          Career Fair Events
        </Heading>
        <Spacer />
        {userDetails.role === 'University' && (
          <div>
            <Button
              colorScheme='blue'
              leftIcon={<SmallAddIcon />}
              mr='6'
              mt='3'
              onClick={onOpen}
            >
              Create Event
            </Button>
            <EventModal
              isOpen={isOpen}
              onClose={onClose}
              university={userDetails.name}
              website={userDetails.website}
              logo={userDetails.logo}
            />
          </div>
        )}
      </Flex>
      {loading &&
        [...Array(2)].map((x, i) => <SkeletonFairEvent key={i} card />)}
      {eventsData.map((event, idx) => (
        <Flex
          key={event.id}
          borderWidth='1px'
          borderColor='gray.300'
          borderRadius='xl'
          p='12px'
          mx='5'
          my='3'
          role='group'
          cursor='pointer'
          _hover={{ background: 'gray.50' }}
          onClick={() => {
            if (
              userDetails.role === 'Student' &&
              userDetails.university !== eventsData[idx].university
            ) {
              toast({
                title: 'You are not a student of this university',
                status: 'error',
                isClosable: true,
              });
            } else if (
              userDetails.role === 'University' &&
              userDetails.name !== eventsData[idx].university
            ) {
              toast({
                title: "You cannot visit another University's event",
                status: 'error',
                isClosable: true,
              });
            } else {
              history.push(`/fair/${event.id}`);
              dispatch(resetFair());
            }
          }}
        >
          <DetailsCard
            alt={event.university}
            image={event.logo}
            title={event.title}
            startDate={event.start}
            endDate={event.end}
            description={event.description}
            website={event.website}
            crop={getDominantColour(event.logo)}
            uni={event.university}
          />
        </Flex>
      ))}
    </div>
  );
}
