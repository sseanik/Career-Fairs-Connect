import React from 'react';
import moment from 'moment';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { asyncEditPresentation } from '../features/companyStall/stallSlice';
// Chakra UI
import {
  Box,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
// Full Calendar
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import auLocale from '@fullcalendar/core/locales/en-au';
// Components
import { PresentationModal } from './PresentationModal';
import { CalendarModal } from './CalendarModal';
import { InfoIcon } from '@chakra-ui/icons';
import getContrastColour from '../util/getContrastColor';

export function PresentationCalendar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Redux
  const dispatch = useDispatch();
  const width = useSelector((state) => state.window.width);
  // State
  const [open, setOpen] = React.useState(false);
  const [event, setEvent] = React.useState({});
  const [modalEventDetails, setModalEventDetails] = React.useState({
    id: '',
    title: '',
    time: '',
    description: '',
    link: '',
    color: '',
    start: {},
    end: {},
  });
  const toast = useToast();

  const eventClick = (info) => {
    setModalEventDetails({
      id: info.event.id,
      title: info.event.title,
      description: info.event.extendedProps.description,
      link: info.event.extendedProps.link,
      color: info.event.backgroundColor,
      start: info.event.start,
      end: info.event.end,
      time: info.event.start.toLocaleString([], {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    });
    onOpen();
    info.el.style.borderColor = 'black';
  };

  //send edited presentation
  const changeEvent = (e) => {
    dispatch(
      asyncEditPresentation({
        presentation: {
          presentation_id: e.event.id,
          title: e.event.title,
          presentation_description: e.event.extendedProps.description,
          presentation_link: e.event.extendedProps.link,
          start_time: e.event.start,
          end_time: e.event.end,
          color: props.bgColour,
          stall_id: props.fairID,
          textColor: getContrastColour(props.bgColour),
        },
        toast: toast,
      })
    );
  };

  const selectEvent = (e) => {
    if (e.view.type !== 'dayGridMonth' && e.start.getDay() === e.end.getDay()) {
      setEvent(e);
      setOpen(true);
    }
  };

  return (
    <div>
      <PresentationModal
        isOpen={isOpen}
        onClose={onClose}
        edit={props.edit}
        stall={props.stall}
        id={modalEventDetails.id}
        title={modalEventDetails.title}
        time={modalEventDetails.time}
        description={modalEventDetails.description}
        link={modalEventDetails.link}
        color={modalEventDetails.color}
        start={modalEventDetails.start}
        end={modalEventDetails.end}
        stallID={props.fairID}
      />
      {props.edit && (
        <CalendarModal
          isOpen={open}
          onClose={() => setOpen(false)}
          event={event}
          color={props.bgColour}
          stallID={props.fairID}
        />
      )}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        }}
        initialView='listMonth'
        editable={props.edit}
        selectable={props.edit}
        selectMirror={true}
        dayMaxEvents={true}
        contentHeight='auto'
        buttonText={useBreakpointValue({
          base: {
            today: 'T',
            month: 'M',
            week: 'W',
            day: 'D',
            list: 'L',
          },
          sm: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            list: 'List',
          },
        })}
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
        eventClick={(info) => eventClick(info)}
        expandRows={true}
        navLinks={true}
        // Confirm if user wants to add selection
        select={(event) => selectEvent(event)}
        // Confirm if user wants to edit
        eventChange={(event) => changeEvent(event)}
      />

      {props.edit && (
        <Box mt='2'>
          <Tooltip
            label='Use the Week or Day Tabs and make a selection on the Calendar to add an event'
            aria-label='A tooltip'
            mr='4'
          >
            <Text ml='2' as='span' fontSize='sm'>
              <InfoIcon mr='2' color='gray' />
              How do I add an event?
            </Text>
          </Tooltip>
          <Tooltip
            label='Events can be dragged and resized to edit their dates and times'
            aria-label='A tooltip'
          >
            <Text ml='2' as='span' fontSize='sm'>
              <InfoIcon mr='2' color='gray' />
              How do I edit the date and time of an event?
            </Text>
          </Tooltip>
        </Box>
      )}
    </div>
  );
}
