import React from 'react';
import { Link } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
// Components
import Navbar from '../../components/navbar';
import { DetailsCard } from '../../components/DetailsCard';
import { OpportunitiesTable } from '../../components/OpportunitiesTable';
import { QuestionsAndAnswers } from './QuestionsAndAnswers';
import { PresentationCalendar } from '../../components/PresentationCalendar';
import { SkeletonFairEvent } from '../careerEvents/SkeletonFairEvent';

export default function CompanyStall(props) {
  const stallID = props.match.params.stallID;
  // Redux
  const dispatch = useDispatch();
  const width = useSelector((state) => state.window.width);
  const stallData = useSelector((state) => state.stall);
  const userData = useSelector((state) => state.user);

  // On page load, gather all stall data
  React.useEffect(
    () => dispatch(asyncFetchStallData(stallID)),
    [dispatch, stallID]
  );

  const navigateBack = () => {
    dispatch(resetFair());
    dispatch(resetStall());
  };

  return (
    <div>
      <Navbar />
      <Box borderWidth='1px' borderColor='gray.300' borderRadius='xs' m='4'>
        <Tabs>
          <TabList>
            <Tab
              _selected={{
                color: stallData.textColour,
                bg: stallData.bgColour,
              }}
            >
              {width <= 830 ? 'Details' : 'Career Fair Details'}
            </Tab>
            <Tab
              _selected={{
                color: stallData.textColour,
                bg: stallData.bgColour,
              }}
            >
              {width <= 830 ? 'Calendar' : 'Presentation Calendar'}
            </Tab>
            <Tab
              _selected={{
                color: stallData.textColour,
                bg: stallData.bgColour,
              }}
            >
              {width <= 830 ? 'Q & A' : 'Questions & Answers'}
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
              {width <= 830 ? 'Back' : 'Back to Career Fair'}
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
        borderColor='gray.300'
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
        />
      </Box>
    </div>
  );
}