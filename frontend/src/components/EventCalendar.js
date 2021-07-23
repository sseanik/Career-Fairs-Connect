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

export function EventCalendar() {
  const events = [
    {
      start: '2021-07-10',
      end: '2021-07-27',
      display: 'inverse-background',
      backgroundColor: 'gray',
    },
    { title: 'Facebook', start: new Date(), end: new Date() },
    {
      title: 'Google',
      start: '2021-07-22',
      end: '2021-07-22',
      color: '#378006',
    },
    {
      title: 'Microsoft',
      start: '2021-07-22',
      end: '2021-07-22',
      color: '#378006',
    },
  ];
  const width = useWindowDimensions().width;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalEventTitle, setModalEventTitle] = React.useState('');
  const [modalEventDescription, setModalEventDescription] = React.useState('');

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m='0' pb='0'>
            {modalEventTitle}
            <Text m='0' pb='1' color='gray.500' fontSize='sm'>
              {modalEventDescription}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py='0'>Hello 123</ModalBody>
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
        contentHeight='320px'
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
          setModalEventDescription(
            `${info.event.start.toLocaleString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}`
          );
          onOpen();
          console.log(info.event._instance.range.end);
          // (info) => {
          //   alert('Event: ' + info.event.title);
          //   // change the border color just for fun
          //   info.el.style.borderColor = 'black';
          // }
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
