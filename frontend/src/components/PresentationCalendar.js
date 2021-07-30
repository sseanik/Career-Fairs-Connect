import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
// Chakra UI
import { useDisclosure } from '@chakra-ui/react';
// Full Calendar
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import auLocale from '@fullcalendar/core/locales/en-au';
// Components
import { PresentationModal } from './PresentationModal';

export function PresentationCalendar(props) {
  const width = useSelector((state) => state.window.width);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalEventTitle, setModalEventTitle] = React.useState('');
  const [modalEventTime, setModalEventTime] = React.useState('');
  const [modalEventDescription, setModalEventDescription] = React.useState('');
  const [modalEventLink, setModalEventLink] = React.useState('');
  const [modalButtonColor, setModalButtonColor] = React.useState('');

  return (
    <div>
      <PresentationModal
        isOpen={isOpen}
        onClose={onClose}
        title={modalEventTitle}
        time={modalEventTime}
        description={modalEventDescription}
        link={modalEventLink}
        stall={props.stall}
        color={modalButtonColor}
      />
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
        contentHeight='auto'
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
        slotMinTime='09:00:00'
        slotMaxTime='21:00:00'
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
        events={props.events}
        eventClick={(info) => {
          setModalButtonColor(info.event.backgroundColor);
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
          setModalEventLink(info.event.extendedProps.link);
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
