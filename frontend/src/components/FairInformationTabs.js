import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { EventCalendar } from './EventCalendar';
import { FairDetails } from './FairDetails';

export function FairInformationTabs() {
  return (
    <Box borderWidth='1px' borderColor='gray.300' borderRadius='xl' m='4'>
      <Tabs>
        <TabList>
          <Tab>Career Fair Details</Tab>
          <Tab>Presentation Calendar</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FairDetails />
          </TabPanel>
          <TabPanel>
            <EventCalendar />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
