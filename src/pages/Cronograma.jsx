import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "../styles/cronograma/Cronograma.scss";
import AgregarEvento from "../components/cronograma/AgregarEvento";
import { getEvents } from "../services/getEvents";

const Cronograma = () => {

  // Variable de estado para controlar la apertura y el cierre del modal
  const [showModal, setShowModal] = useState(false);
  // Variable de estado para controlar los eventos que llegan del json server
  const [events, setEvents] = useState([]);

  const [selectedDateString, setSelectedDateString] = useState('');

  // Para abrir el modal al darle click a un día
  const handleDayClick = (info) => {
    setShowModal(true);
    const selectedDate  = info.dateStr;
    setSelectedDateString(selectedDate);
  };

  // Para cerrar el modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  // Para agregar un evento, acá debería ir la lógica del post a la base de datos, revisar el getAPI de full calendar
  const handleAgregarEvento = (evento) => {
    const formattedStart = moment(evento.start).format('YYYY-MM-DDTHH:mm:ss');
  const formattedEnd = moment(evento.end).format('YYYY-MM-DDTHH:mm:ss');

  const newEvento = {
    title: evento.title,
    start: formattedStart,
    end: formattedEnd
  };

  console.log(newEvento);
  handleModalClose();
  };

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <section>
      <div className="container" style={{ padding: "8rem" }}>
        <div id="calendar" className="custom-calendar">
          <button onClick={handleDayClick}>Agregar evento</button>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            timeZone= "America/Bogota"
            initialView="dayGridMonth"
            locale={esLocale}
            headerToolbar={{
              left: "prev next today",
              center: "title",
              right: "dayGridMonth timeGridWeek timeGridDay listWeek",
            }}
            events={events}
            editable={true}
            dateClick={handleDayClick}
            slotLabelFormat={{
              hour: "numeric",
              hour12: true,
            }}
          />
        </div>
      </div>
      <AgregarEvento
        show={showModal}
        onClose={handleModalClose}
        onAgregarEvento={handleAgregarEvento}
        selectedDateString={selectedDateString}
      />
    </section>
  );
};

export default Cronograma;
