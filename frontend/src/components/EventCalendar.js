import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import auLocale from '@fullcalendar/core/locales/en-au';
import { Box } from '@chakra-ui/react';
import useWindowDimensions from '../app/useWindowDimensions';
import moment from 'moment';

export function EventCalendar() {
  const events = [
    {
      start: '2021-07-10',
      end: '2021-07-27',
      display: 'inverse-background',
      backgroundColor: 'gray',
    },
    { title: 'Facebook', start: new Date() },
    {
      title: 'Google',
      start: '2021-07-23',
      color: '#378006',
    },
    {
      title: 'Microsoft',
      start: '2021-07-23',
      color: '#378006',
    },
  ];
  const width = useWindowDimensions().width;

  return (
    <Box>
      <FullCalendar
        themeSystem='Flatly'
        height='390px'
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
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,list',
        }}
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
        initialView='dayGridMonth'
        editable={false}
        selectable={false}
        selectMirror={true}
        dayMaxEvents={true}
        events={events} // alternatively, use the `events` setting to fetch from a feed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
    </Box>
  );
}
