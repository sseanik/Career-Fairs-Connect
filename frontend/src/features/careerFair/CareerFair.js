import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncFetchFairData, resetFair } from './fairSlice';
// Chakra UI
import {
  Box,
  Button,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
// Components
import Navbar from '../../components/navbar';
import { StallCard } from '../../components/StallCard';
import { DetailsCard } from '../../components/DetailsCard';
import { OpportunitiesTable } from '../../components/OpportunitiesTable';
import { PresentationCalendar } from '../../components/PresentationCalendar';
import { SkeletonFairEvent } from '../../components/SkeletonFairEvent';
import { resetEvents } from './eventsSlice';
import { SkeletonStallCard } from '../../components/SkeletonStallCard';

export default function CareerFair(props) {
  const fairID = props.match.params.fairID;
  // Redux
  const dispatch = useDispatch();
  const width = useSelector((state) => state.window.width);
  const fairData = useSelector((state) => state.fair);

  React.useEffect(
    () => dispatch(asyncFetchFairData(fairID)),
    [dispatch, fairID]
  );

  return (
    <div>
      <Navbar />
      <Box borderWidth='1px' borderColor='gray.300' borderRadius='xs' m='4'>
        <Tabs>
          <TabList>
            <Tab
              _selected={{
                color: fairData.textColour,
                bg: fairData.bgColour,
              }}
            >
              {width <= 775 ? 'Details' : 'Career Fair Details'}
            </Tab>
            <Tab
              _selected={{
                color: fairData.textColour,
                bg: fairData.bgColour,
              }}
            >
              {width <= 775 ? 'Calendar' : 'Presentation Calendar'}
            </Tab>
            <Tab
              _selected={{
                color: fairData.textColour,
                bg: fairData.bgColour,
              }}
            >
              Opportunities
            </Tab>
            <Spacer />
            <Button
              leftIcon={<ArrowBackIcon />}
              m='0'
              align='left'
              borderRadius='0'
              fontWeight='normal'
              as={Link}
              to='/events'
              onClick={() => {
                dispatch(resetEvents());
                dispatch(resetFair());
              }}
            >
              {width <= 775 ? 'Back' : 'Back to Fair List'}
            </Button>
          </TabList>
          <TabPanels align='start'>
            <TabPanel>
              {fairData.loading && <SkeletonFairEvent />}
              <DetailsCard
                alt={fairData.university}
                image={fairData.logo}
                title={fairData.title}
                startDate={fairData.start}
                endDate={fairData.end}
                description={fairData.description}
                website={fairData.website}
                bg={fairData.bgColour}
                loading={fairData.loading}
                fairID={fairID}
                fair
              />
            </TabPanel>
            <TabPanel>
              <PresentationCalendar events={fairData.events} />
            </TabPanel>
            <TabPanel>
              <OpportunitiesTable
                opportunities={fairData.opportunities}
                limit={5}
                interact={false}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Flex direction='row' flexWrap='wrap' justify='center'>
        {fairData.loading &&
          [...Array(4)].map((x, i) => <SkeletonStallCard key={i} card />)}

        {fairData.stalls.map((event) => (
          <StallCard
            key={event.id}
            id={event.id}
            name={event.company}
            description={event.description}
            img={event.logo}
            isLive={event.isLive}
            pending={event.pending}
          />
        ))}
      </Flex>
    </div>
  );
}
