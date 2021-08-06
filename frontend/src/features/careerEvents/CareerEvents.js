import React from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchEventsData } from './eventsSlice';
import { resetFair } from '../careerFair/fairSlice';
// Chakra
import {
  Button,
  Flex,
  Heading,
  Spacer,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
// Componentsimport { EventModal } from '../../components/EventModal';
import { DetailsCard } from '../../components/DetailsCard';
import { SkeletonFairEvent } from './SkeletonFairEvent';
import getDominantColour from '../../util/getDominantColour';
import { EventModal } from '../../components/EventModal';

export default function CareerEvents() {
  // React Router
  const history = useHistory();
  // For toast and modal
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Redux
  const dispatch = useDispatch();
  const eventsData = useSelector((state) => state.events.events);
  const userDetails = useSelector((state) => state.user);
  const loading = useSelector((state) => state.events.loading);
  const createStatus = useSelector((state) => state.events.status);
  const { colorMode } = useColorMode();

  // On page load gather all career fair events
  React.useEffect(() => dispatch(asyncFetchEventsData()), [dispatch]);

  // Navigate to fair event if permissions allow the user to
  const visitFairEvent = (event, idx) => {
    if (
      userDetails.role === 'Student' &&
      userDetails.university !== eventsData[idx].university
    ) {
      toast({
        description: 'You are not a student of this university',
        status: 'error',
        isClosable: true,
      });
    } else if (
      userDetails.role === 'University' &&
      userDetails.name !== eventsData[idx].university
    ) {
      toast({
        description: "You cannot visit another University's event",
        status: 'error',
        isClosable: true,
      });
    } else {
      history.push(`/fair/${event.id}`);
      dispatch(resetFair());
    }
  };

  return (
    <div>
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
              isLoading={createStatus}
              loadingText='Creating Event'
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
          borderColor={colorMode === 'light' ? 'gray.300' : 'gray.700'}
          borderRadius='xl'
          p='12px'
          mx='5'
          my='3'
          role='group'
          cursor='pointer'
          _hover={{
            background: colorMode === 'light' ? 'gray.50' : 'gray.700',
          }}
          onClick={() => visitFairEvent(event, idx)}
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
