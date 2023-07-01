import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const Cronograma = () => {

  const events = [
    { title: 'Evento 1', date: '2023-07-14' },
    { title: 'Evento 2', date: '2023-07-02' },
    { title: 'Evento 3', date: '2023-07-03' },
  ];

  return (
    <div>
      <div className="container">
        <div id="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="es"
            headerToolbar={{
              left: 'prev next today',
              center: 'title',
              right: 'dayGridMonth timeGridWeek listWeek'
            }}
            events={events}
            editable={true}
          />
        </div>
      </div>

      
    </div>
  );
}

export default Cronograma;
