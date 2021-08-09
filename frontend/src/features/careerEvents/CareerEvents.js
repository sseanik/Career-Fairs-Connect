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
  useToast,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
// Components
import { EventModal } from '../../components/EventModal';
import { DetailsCard } from '../../components/DetailsCard';
import { SkeletonFairEvent } from './SkeletonFairEvent';
import getDominantColour from '../../util/getDominantColour';

export default function CareerEvents() {
  // Redux
  const dispatch = useDispatch();

  // On page load gather all career fair events
  React.useEffect(() => {
    dispatch(asyncFetchEventsData());
  }, [dispatch]);

  return (
    <div>
      <MemoizedActionBar />
      <MemoizedEventCards />
    </div>
  );
}

function ActionBar() {
  const [isOpen, setOpen] = React.useState(false);
  const createStatus = useSelector((state) => state.events.status);
  const userDetails = useSelector((state) => state.user);

  return (
    <Flex align='center'>
      <EventModal
        isOpen={isOpen}
        setOpen={setOpen}
        university={userDetails.name}
        website={userDetails.website}
        logo={userDetails.logo}
      />
      <Heading ml='6' mt='3' as='h3' size='md' fontWeight='500'>
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
            onClick={() => setOpen(!isOpen)}
            isLoading={createStatus}
            loadingText='Creating Event'
          >
            Create Event
          </Button>
        </div>
      )}
    </Flex>
  );
}

const MemoizedActionBar = React.memo(ActionBar);

function EventCards() {
  const loading = useSelector((state) => state.events.loading);
  const { colorMode } = useColorMode();
  // React Router
  const history = useHistory();
  // For toast and modal
  const toast = useToast();
  const eventsData = useSelector((state) => state.events.events);
  const userDetails = useSelector((state) => state.user);
  // Redux
  const dispatch = useDispatch();

  // Navigate to fair event if permissions allow the user to
  const visitFairEvent = (event) => {
    if (
      userDetails.role === 'Student' &&
      userDetails.university !== event.university
    ) {
      toast({
        description: 'You are not a student of this university',
        status: 'error',
        isClosable: true,
      });
    } else if (
      userDetails.role === 'University' &&
      userDetails.name !== event.university
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

  //filter the events so that student and university cannot see the events held by other universities
  const filteredData = () => {
    switch (userDetails.role) {
      case 'Student':
        return eventsData.filter(
          (event) => event.university === userDetails.university
        );
      case 'University':
        return eventsData.filter(
          (event) => event.university === userDetails.name
        );
      default:
        return eventsData;
    }
  };

  return (
    <div>
      {loading &&
        [...Array(2)].map((x, i) => <SkeletonFairEvent key={i} card />)}
      {filteredData().map((event, idx) => (
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
          justify={{ base: 'center', md: 'flex-start' }}
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
const MemoizedEventCards = React.memo(EventCards);
