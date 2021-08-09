import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { BiDetail } from 'react-icons/bi';
import { IoCalendar } from 'react-icons/io5';
import { ImTable2 } from 'react-icons/im';
// Components
import { StallCard } from '../companyStall/StallCard';
import { DetailsCard } from '../../components/DetailsCard';
import { OpportunitiesTable } from '../../components/OpportunitiesTable';
import { PresentationCalendar } from '../../components/PresentationCalendar';
import { SkeletonFairEvent } from '../careerEvents/SkeletonFairEvent';
import { SkeletonStallCard } from '../companyStall/SkeletonStallCard';

export default function CareerFair(props) {
  const fairID = props.match.params.fairID;
  const location = useLocation();
  // Redux
  const dispatch = useDispatch();
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

  const updateURL = (tab) => {
    if (location.pathname.includes('presentation')) {
      window.history.replaceState(
        null,
        tab,
        location.pathname.replace('presentation', tab)
      );
    } else if (location.pathname.includes('opportunity')) {
      window.history.replaceState(
        null,
        tab,
        location.pathname.replace('opportunity', tab)
      );
    } else if (location.pathname.endsWith('/')) {
      window.history.replaceState(null, tab, location.pathname.concat(tab));
    } else {
      window.history.replaceState(
        null,
        tab,
        location.pathname.concat(`/${tab}`)
      );
    }
  };

  return (
    <div>
      <Box
        borderWidth='1px'
        borderColor={useColorModeValue('gray.300', 'gray.700')}
        borderRadius='xs'
        m='4'
      >
        <Tabs
          defaultIndex={
            !props.match.params.tab
              ? 0
              : props.match.params.tab === 'presentation'
                ? 1
                : 2
          }
        >
          <TabList>
            <Tab
              onClick={() => updateURL('')}
              _selected={{
                color: fairData.textColour,
                bg: fairData.bgColour,
              }}
            >
              {useBreakpointValue({
                base: <BiDetail />,
                sm: 'Details',
                md: 'Career Details',
              })}
            </Tab>
            <Tab
              onClick={() => updateURL('presentation')}
              _selected={{
                color: fairData.textColour,
                bg: fairData.bgColour,
              }}
            >
              {useBreakpointValue({
                base: <IoCalendar />,
                sm: 'Calendar',
                md: 'Presentation Calendar',
              })}
            </Tab>
            <Tab
              onClick={() => updateURL('opportunity')}
              _selected={{
                color: fairData.textColour,
                bg: fairData.bgColour,
              }}
            >
              {useBreakpointValue({
                base: <ImTable2 />,
                sm: 'Opportunities',
                md: 'Opportunities',
              })}
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
              {useBreakpointValue({
                base: '',
                sm: 'Back',
                md: 'Back to Fair List',
              })}
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
                fairID={fairID}
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
            pending={event.approval_status}
          />
        ))}
      </Flex>
    </div>
  );
}
