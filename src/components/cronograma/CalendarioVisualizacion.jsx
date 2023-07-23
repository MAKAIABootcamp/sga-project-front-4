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
  const renderConvenciones = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Tipo de Evento</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Festivo</td>
            <td style={{ backgroundColor: "#E74C3C" }}></td>
          </tr>
          <tr>
            <td>Entrega</td>
            <td style={{ backgroundColor: "#27AE60" }}></td>
          </tr>
          <tr>
            <td>Clase</td>
            <td style={{ backgroundColor: "#F39C12" }}></td>
          </tr>
        </tbody>
      </table>
    );
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
    <section style={{height: isMobile ? "18rem" : "18rem", marginTop:isMobile? "8rem":"10rem"}} className="seccionCalendarioVisualizacion">
      <div className="seccionCalendarioVisualizacion__container" >
        <div id="calendar" className="custom-calendar">
          {isMobile && (
            <div className="seccionCalendarioVisualizacion__titulo">
              <h2 >Agenda</h2>
              {selectedWeek && <p>Semana seleccionada: {selectedWeek}</p>}
              {selectedDay && <p>Día seleccionado: {selectedDay}</p>}
            </div>
          )}
          <FullCalendar {...calendarOptions} />
        </div>
        <div className="seccionCalendarioVisualizacion__eventDetails"  style={{ display:isMobile? "none" : "flex" }}>
          <div><h1>Haga click en un evento para ver los detalles aquí</h1> </div>
          
  {selectedDay && (
    <div className="seccionCalendarioVisualizacion__eventoSeleccionado"  style={{ display:isMobile? "none" : "flex" }}>

      <section>
          <h3>{selectedDay.title}</h3>
      <p>{selectedDay.detalles}</p>
      <p>Hora de inicio: {selectedDay.fechaInicio.toLocaleTimeString()}</p>
      {selectedDay.fechaFin && (
        <p>Hora de fin: {selectedDay.fechaFin.toLocaleTimeString()}</p>
      )}  
      </section>
  
    </div>
  )}
</div>
      </div>{isMobile ? (
        // Vista móvil: Tabla de convenciones en el header
        <header>
          {renderConvenciones()}
        </header>
      ) : (
        // Vista de escritorio: Tabla de convenciones en el footer
        <footer>
          {renderConvenciones()}
        </footer>
      )}
    </section>
  );
};

export default CalendarioVisualizacion;
