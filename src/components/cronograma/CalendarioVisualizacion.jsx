import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import "../../styles/cronograma/Cronograma.scss";
import { getEvents } from "../../services/getEvents";

const Cronograma = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    getEvents().then((data) => {
      setEventos(data);
    });
  }, []);

 const eventContent = (info) => {
  const event = info.event;

  let backgroundColor = "#3788D8"; // Por defecto: azul
  let textColor = "#FFFFFF"; // Por defecto: blanco

  if (event.extendedProps.tipo === "festivo") {
    backgroundColor = "#E74C3C"; // Festivos: rojo
    textColor = "#FF0000"; // Festivos: rojo
  } else if (event.extendedProps.tipo === "entrega") {
    backgroundColor = "#27AE60"; // Entregas: verde
  } else if (event.extendedProps.tipo === "clase") {
    backgroundColor = "#F39C12"; // Clases: amarillo
  }

  return {
    html: `<div class="custom-event" style="background-color: ${backgroundColor}; color: ${textColor};">${event.title}</div>`,
  };
};

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
            editable={false}
            eventContent={eventContent} // Personaliza la apariencia de los eventos a través de eventContent
          />
        </div>
      </div>
    </section>
  );
};

export default Cronograma;
