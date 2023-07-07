import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
// import "../styles/cronograma/Cronograma.scss";
import { getEvents } from "../services/getEvents";

const CalendarioVisualizacion = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    getEvents().then((data) => {
      setEventos(data);
    });
  }, []);

  return (
    <section>
      <div className="container" style={{ padding: "8rem" }}>
        <div id="calendar" className="custom-calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            timeZone="America/Bogota"
            initialView="dayGridMonth"
            locale={esLocale}
            headerToolbar={{
              left: "prev next today",
              center: "title",
              right: "dayGridMonth timeGridWeek listWeek",
            }}
            events={eventos}
            editable={false} // Desactiva la edición y arrastrar y soltar
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarioVisualizacion;
