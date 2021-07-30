import { Flex, Heading } from '@chakra-ui/react';
import { prominent } from 'color.js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DetailsCard } from '../../components/DetailsCard';
import Navbar from '../../components/navbar';
import { SkeletonFairEvent } from '../../components/SkeletonFairEvent';
import { asyncFetchEventsData } from './eventsSlice';
import { resetFair } from './fairSlice';

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
  const dispatch = useDispatch();
  const eventsData = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.events.loading);

  React.useEffect(() => dispatch(asyncFetchEventsData()), [dispatch]);

  return (
    <div>
      <Navbar />
      <Heading ml='6' mt='3' as='h3' size='md' fontWeight='semibold'>
        Career Fair Events:
      </Heading>
      {loading &&
        [...Array(2)].map((x, i) => <SkeletonFairEvent key={i} card />)}
      {eventsData.map((event) => (
        <Flex
          key={event.id}
          borderWidth='1px'
          borderColor='gray.300'
          borderRadius='xl'
          p='12px'
          mx='5'
          my='3'
          role='group'
          _hover={{ background: 'gray.50' }}
          as={Link}
          to={`/fair/${event.id}`}
          onClick={() => dispatch(resetFair())}
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
