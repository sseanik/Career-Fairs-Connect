import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchStallData, resetStall } from '../companyStall/stallSlice';
import { resetFair } from '../careerFair/fairSlice';
// Chakra
import {
  Box,
  Button,
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
// Components
import { DetailsCard } from '../../components/DetailsCard';
import { OpportunitiesTable } from '../../components/OpportunitiesTable';
import { QuestionsAndAnswers } from './QuestionsAndAnswers';
import { PresentationCalendar } from '../../components/PresentationCalendar';
import { SkeletonFairEvent } from '../careerEvents/SkeletonFairEvent';
import { BiDetail } from 'react-icons/bi';
import { IoCalendar } from 'react-icons/io5';
import { MdQuestionAnswer } from 'react-icons/md';

export default function CompanyStall(props) {
  const stallID = props.match.params.stallID;
  const location = useLocation();
  // Redux
  const dispatch = useDispatch();
  const stallData = useSelector((state) => state.stall);
  const userData = useSelector((state) => state.user);

  // On page load, gather all stall data
  React.useEffect(
    () => dispatch(asyncFetchStallData({ stallID: parseInt(stallID) })),
    [dispatch, stallID]
  );

  const navigateBack = () => {
    dispatch(resetFair());
    dispatch(resetStall());
  };

  const updateURL = (tab) => {
    if (location.pathname.includes('presentation')) {
      window.history.replaceState(
        null,
        tab,
        location.pathname.replace('presentation', tab)
      );
    } else if (location.pathname.includes('qanda')) {
      window.history.replaceState(
        null,
        tab,
        location.pathname.replace('qanda', tab)
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
                color: stallData.textColour,
                bg: stallData.bgColour,
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
                color: stallData.textColour,
                bg: stallData.bgColour,
              }}
            >
              {useBreakpointValue({
                base: <IoCalendar />,
                sm: 'Calendar',
                md: 'Presentation Calendar',
              })}{' '}
            </Tab>
            <Tab
              onClick={() => updateURL('qanda')}
              _selected={{
                color: stallData.textColour,
                bg: stallData.bgColour,
              }}
            >
              {useBreakpointValue({
                base: <MdQuestionAnswer />,
                sm: 'Q & A',
                md: 'Question & Answers',
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
              isDisabled={!stallData.fairID}
              to={`/fair/${stallData.fairID}`}
              onClick={() => navigateBack()}
            >
              {useBreakpointValue({
                base: '',
                sm: 'Back',
                md: 'Back to Career Fair',
              })}{' '}
            </Button>
          </TabList>
          <TabPanels>
            <TabPanel>
              {stallData.loading && <SkeletonFairEvent />}

              <DetailsCard
                alt={stallData.company}
                image={stallData.logo}
                title={stallData.company}
                website={stallData.website}
                isLive={stallData.live}
                numOpportunities={stallData.opportunities.length}
                description={stallData.description}
                loading={stallData.loading}
                bgColour={stallData.bgColour}
                textColour={stallData.textColour}
                fairID={stallID}
                stall
              />
            </TabPanel>
            <TabPanel>
              <PresentationCalendar
                events={stallData.events}
                bgColour={stallData.bgColour}
                edit={
                  userData.role === 'Company' &&
                  userData.name === stallData.company
                }
                fairID={stallID}
                stall
              />
            </TabPanel>
            <TabPanel>
              <QuestionsAndAnswers qandas={stallData.qandas} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box
        borderWidth='1px'
        borderColor={useColorModeValue('gray.300', 'gray.700')}
        borderRadius='xl'
        m='4'
        p='4'
      >
        <OpportunitiesTable
          opportunities={stallData.opportunities}
          limit={false}
          interact={true}
          loading={stallData.loading}
          company={stallData.company}
          fairID={stallID}
        />
      </Box>
    </div>
  );
}
