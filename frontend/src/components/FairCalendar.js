import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import auLocale from '@fullcalendar/core/locales/en-au';
import useWindowDimensions from '../app/useWindowDimensions';

import moment from 'moment';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const events = [
  {
    // start: '03-07-2021',
    // end: '03-08-2021',
    start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substring(0, 10),
    end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substring(0, 10),
    display: 'inverse-background',
    backgroundColor: 'gray',
  },
  {
    title: 'Facebook',
    start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
      14,
      0
    ),
    end: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
      15,
      0
    ),
    color: 'blue',
    description: 'Facebook live fair event to share upcoming opportunities.',
  },
  {
    title: 'Amazon',
    start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
      13,
      0
    ),
    end: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
      14,
      0
    ),
    color: 'yellow',
    description: 'Amazon cyber security internship and graduate opportunities.',
  },
  {
    title: 'Netflix',
    start: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).setHours(
      13,
      0
    ),
    end: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).setHours(
      14,
      0
    ),
    color: 'red',
    description: 'Netflix virtual presentation on opportunities in the US',
  },
  {
    title: 'Google',
    start: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).setHours(
      15,
      0
    ),
    end: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).setHours(
      16,
      0
    ),
    color: 'Green',
    description:
      'Google Sydney Based Opportunities talk ranging from the Google STEP Program, Internship program and the Graduate Program.',
  },
  {
    title: 'Deloitte',
    start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
      10,
      0
    ),
    end: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
      11,
      0
    ),
    color: 'green',
    description: 'Deloitte opportunities',
  },
  {
    title: 'PWC',
    start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
      10,
      0
    ),
    end: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
      11,
      0
    ),
    color: 'orange',
    description: 'PWC opportunities',
  },
  {
    title: 'Canva',
    start: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).setHours(
      10,
      0
    ),
    end: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).setHours(
      11,
      0
    ),
    color: 'teal',
    description: 'Canva opportunities',
  },
  {
    title: 'Atlassian',
    start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
      10,
      0
    ),
    end: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
      11,
      0
    ),
    color: 'blue',
    description: 'Atlassian opportunities',
  },
  {
    title: 'Telstra',
    start: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).setHours(
      10,
      0
    ),
    end: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).setHours(
      11,
      0
    ),
    color: 'blue',
    description: 'Telstra opportunities',
  },
  {
    title: 'Optus',
    start: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).setHours(
      15,
      0
    ),
    end: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).setHours(
      17,
      0
    ),
    color: 'teal',
    description: 'Optus opportunities',
  },
];

export function FairCalendar() {
  const width = useWindowDimensions().width;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalEventTitle, setModalEventTitle] = React.useState('');
  const [modalEventTime, setModalEventTime] = React.useState('');
  const [modalEventDescription, setModalEventDescription] = React.useState('');

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m='0' pb='0'>
            {modalEventTitle}
            <Text m='0' pb='1' color='gray.500' fontSize='sm'>
              {modalEventTime}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py='0'>{modalEventDescription}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        }}
        initialView='listMonth'
        editable={false}
        selectable={false}
        selectMirror={true}
        dayMaxEvents={true}
        contentHeight='382px'
        buttonText={
          width <= 750
            ? {
                today: 'T',
                month: 'M',
                week: 'W',
                day: 'D',
                list: 'L',
              }
            : {
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day',
                list: 'List',
              }
        }
        titleFormat={
          width <= 615 && {
            month: 'short',
          }
        }
        slotMinTime='08:00:00'
        slotMaxTime='22:00:00'
        dayHeaderFormat={{ weekday: 'short' }}
        nowIndicator={true}
        locales={[auLocale]}
        locale='en-au'
        firstDay='1'
        scrollTime={moment().format('HH') + ':00:00'}
        allDaySlot={false}
        fixedWeekCount={false}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }}
        events={events}
        eventClick={(info) => {
          setModalEventTitle(info.event.title);
          setModalEventTime(
            info.event.start.toLocaleString([], {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
          );
          setModalEventDescription(info.event.extendedProps.description);
          onOpen();
          info.el.style.borderColor = 'black';
        }}
        // alternatively, use the `events` setting to fetch from a feed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
    </div>
  );
}
