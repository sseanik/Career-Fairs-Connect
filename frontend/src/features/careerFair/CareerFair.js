import React from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchFairData, resetFair } from './fairSlice';
import { resetEvents } from '../careerEvents/eventsSlice';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
// Components
import Navbar from '../../components/navbar';
import { StallCard } from '../companyStall/StallCard';
import { DetailsCard } from '../../components/DetailsCard';
import { OpportunitiesTable } from '../../components/OpportunitiesTable';
import { PresentationCalendar } from '../../components/PresentationCalendar';
import { SkeletonFairEvent } from '../careerEvents/SkeletonFairEvent';
import { SkeletonStallCard } from '../companyStall/SkeletonStallCard';

export default function CareerFair(props) {
  const fairID = props.match.params.fairID;
  // Redux
  const dispatch = useDispatch();
  const width = useSelector((state) => state.window.width);
  const fairData = useSelector((state) => state.fair);

  // On page load, gather all fair data
  React.useEffect(
    () => dispatch(asyncFetchFairData(fairID)),
    [dispatch, fairID]
  );

  const navigateBack = () => {
    dispatch(resetEvents());
    dispatch(resetFair());
  };

  return (
    <div>
      <Navbar />
      <Box
        borderWidth='1px'
        borderColor={useColorModeValue('gray.300', 'gray.700')}
        borderRadius='xs'
        m='4'
      >
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
              onClick={() => navigateBack()}
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
