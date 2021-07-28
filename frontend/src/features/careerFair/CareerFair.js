import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import Navbar from '../../components/navbar';
import { StallCard } from '../../components/StallCard';
import { FairDetails } from '../../components/FairDetails';
import { FairCalendar } from '../../components/FairCalendar';
import useWindowDimensions from '../../app/useWindowDimensions';
import { FairOpportunities } from '../../components/FairOpportunities';

const events = [
  {
    name: 'Facebook',
    description:
      "Facebook, Inc. operates as a social networking company worldwide. The company engages in the development of social media applications for people to connect through mobile devices, personal computers, and other surfaces. ... The firm's products include Facebook, Instagram, Messenger, WhatsApp, and Oculus.",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Facebook.svg/1280px-Facebook.svg.png',
    isLive: false,
  },
  {
    name: 'Amazon',
    description:
      'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS).',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    isLive: true,
  },
  {
    name: 'Netflix',
    description:
      "Netflix is one of the world's leading entertainment services with over 209 million paid memberships in over 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages. Members can watch as much as they want, anytime, anywhere, on any internet-connected screen.",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
    isLive: false,
  },
  {
    name: 'Google',
    description:
      'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png',
    isLive: true,
  },
  {
    name: 'Deloitte',
    description:
      'At Deloitte, we are driven to create an impact that matters at every opportunity.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlsnYWv2lavyp-lj6Hf2tGMIK5s9he23ls4BGC2ATjA8MXOc9KI20j9wyYHBqRBxVTi0A&usqp=CAU',
    isLive: true,
  },
  {
    name: 'KPMG',
    description:
      'KPMG is a global network of professional services firms providing Audit, Tax and Advisory services. We operate in 146 countries and territories and in FY20 had close to 227,000 people working in member firms around the world. Each KPMG firm is a legally distinct and separate entity and describes itself as such.    ',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg',
    isLive: false,
  },
  {
    name: 'EY',
    description:
      'What does Ernst & Young do? Ernst & Young, trading as EY, is a global accounting firm that derives its revenue from a range of audit, tax and advisory services.    ',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/1200px-EY_logo_2019.svg.png',
    isLive: false,
  },
  {
    name: 'PWC',
    description:
      "PricewaterhouseCoopers offers a range of audit, tax and advisory services including: Assurance – Provision of assurance on the financial performance and operations of clients' business. Consulting – Actuarial, operational, personnel and financial consulting services.    ",
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/05/PricewaterhouseCoopers_Logo.svg',
    isLive: false,
  },
  {
    name: 'Canva',
    description:
      'Canva, Inc. operates a graphic designing platform. The Company offers solutions that enable users to design blog graphics, presentations, flyers, posters, and invitations.',
    img: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Canva_Logo.png',
    isLive: true,
  },
  {
    name: 'Atlassian',
    description:
      'Atlassian Corp. Plc is a holding company, which engages in the design, development, license, and maintenance of software and provision software hosting services. Its products include JIRA software, align, core, and Service Desk, Confluence, Trello, Bitbucket, Sourcetree, bamboo, opsgenie, and statuspage.    ',
    img: 'https://wac-cdn.atlassian.com/dam/jcr:8a794ead-879b-460e-b6be-1189ee66ab66/atlassian_logo-1200x630.png',
    isLive: true,
  },
  {
    name: 'Optiver',
    description:
      'Optiver is a proprietary trading firm and market maker for various exchange-listed financial instruments. Its name derives from the Dutch optieverhandelaar, or "option trader". The company is privately owned. Optiver trades listed derivatives, cash equities, exchange-traded funds, bonds and foreign exchange.    ',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Optiver_Logo.svg/2000px-Optiver_Logo.svg.png',
    isLive: true,
  },
  {
    name: 'IMC',
    description:
      'IMC Financial Markets, sometimes referred to as IMC Trading, is a proprietary trading firm and market maker for various financial instruments listed on exchanges throughout the world.    ',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/IMC_Logo.svg/330px-IMC_Logo.svg.png',
    isLive: false,
  },
  {
    name: 'Telstra',
    description:
      "Telstra Corporation Limited is an Australian telecommunications company which builds and operates telecommunications networks and markets voice, mobile, internet access, pay television and other products and services. It is a member of the S&P/ASX 20 and Australia's largest telecommunications company by market share.    ",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Telstra_logo.svg/100px-Telstra_logo.svg.png',
    isLive: true,
  },
  {
    name: 'Optus',
    description:
      "Singtel Optus Pty Limited (commonly referred to as Optus) is an Australian telecommunications company headquartered in Macquarie Park, New South Wales, Australia. ... Through its Optus 'Yes' brand, it provides broadband, and wireless internet services. Other wholesale services include Satellite and 4G Mobile.    ",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Optus_logo.svg/2560px-Optus_logo.svg.png',
    isLive: false,
  },
];

export function CareerFair() {
  const width = useWindowDimensions().width;

  return (
    <div>
      <Navbar />
      <Box borderWidth='1px' borderColor='gray.300' borderRadius='xl' m='4'>
        <Tabs>
          <TabList>
            <Tab>{width <= 510 ? 'Details' : 'Career Fair Details'}</Tab>
            <Tab>{width <= 510 ? 'Calendar' : 'Presentation Calendar'}</Tab>
            <Tab>Opportunities</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FairDetails />
            </TabPanel>
            <TabPanel>
              <FairCalendar />
            </TabPanel>
            <TabPanel>
              <FairOpportunities />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Flex direction='row' flexWrap='wrap' justify='center'>
        {events.map((event, key) => (
          <StallCard
            key={key}
            name={event.name}
            description={event.description}
            img={event.img}
            isLive={event.isLive}
          />
        ))}
      </Flex>
    </div>
  );
}
