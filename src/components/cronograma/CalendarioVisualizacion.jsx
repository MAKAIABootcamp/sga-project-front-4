import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { getEvents } from "../../services/getEvents";
import "../../styles/cronograma/Cronograma.scss";
const CalendarioVisualizacion = () => {
  const [eventos, setEventos] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);

  useEffect(() => {
    getEvents().then((data) => {
      setEventos(data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEventClick = (info) => {
    if (!isMobile) {
      const event = info.event;
      console.log(event);
      const { title, start, end } = event;
  
      setSelectedDay({
        title,
        fechaInicio: start,
        fechaFin: end ? end : null,
      });
    }
  };
  

  const colorearEvento = (tipo) => {
    let backgroundColor = "#3788D8"; // Por defecto: azul
    let textColor = "#FFFFFF"; // Por defecto: blanco
  
    if (tipo === "festivo") {
      backgroundColor = "#E74C3C"; // Festivos: rojo
    } else if (tipo === "entrega") {
      backgroundColor = "#27AE60"; // Entregas: verde
    } else if (tipo === "clase") {
      backgroundColor = "#F39C12"; // Clases: amarillo
    }
  
    return { backgroundColor, textColor };
  };
  
  const ajustarContenidoEvento = (info) => {
    const event = info.event;
    const { backgroundColor, textColor } = colorearEvento(event.extendedProps.tipo);
  
    // Verificar si es vista móvil o escritorio
    if (isMobile) {
      // Vista móvil: Mostrar fecha de inicio y fin del evento
      return {
        html: `<div class="custom-event" style="background-color: ${backgroundColor}; color: ${textColor};">${event.title} - ${event.start.toLocaleDateString()} ${event.end ? `- ${event.end.toLocaleDateString()}` : ''}</div>`,
      };
    } else {
      // Vista de escritorio: Mostrar solo el título del evento
      return {
        html: `<div class="custom-event custom-event-circle" style="background-color: ${backgroundColor};"></div>`,
        backgroundColorClass: `event-background-${event.id}`, // Agregamos una clase con el color de fondo correspondiente
      };
      
      
    }
  };
  
  
  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    timeZone: "America/Bogota",
    eventClick: handleEventClick,
    locale: esLocale,
    events: eventos,
    editable: false,
    initialView: isMobile ? "listWeek" : "dayGridMonth",
    eventContent: ajustarContenidoEvento,
    dayHeaderContent: isMobile
      ? (args) => {
          return args.dayNumberText;
        }
      : undefined,
    eventDidMount: isMobile
      ? (info) => {
          info.el.style.cursor = "pointer";
        }
      : undefined,
    weekNumberFormat: isMobile ? "w" : undefined,
   
  };



  return (
<section style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '8px' }}>
      <div className="container" >
        <div id="calendar" className="custom-calendar">
          {isMobile && (
            <div className="container__titulo">
              <h2 >Agenda</h2>
              {selectedWeek && <p>Semana seleccionada: {selectedWeek}</p>}
              {selectedDay && <p>Día seleccionado: {selectedDay}</p>}
            </div>
          )}
          <FullCalendar {...calendarOptions} />
        </div>
        <div className="event-details">
  {selectedDay && (
    <div className="container__eventoSeleccionado"  style={{ display:isMobile? "none" : "flex" }}>
      <h3>{selectedDay.title}</h3>
      <p>{selectedDay.detalles}</p>
      <p>Hora de inicio: {selectedDay.fechaInicio.toLocaleTimeString()}</p>
      {selectedDay.fechaFin && (
        <p>Hora de fin: {selectedDay.fechaFin.toLocaleTimeString()}</p>
      )}
    </div>
  )}
</div>

      </div>
    </section>
  );
};

export default CalendarioVisualizacion;
