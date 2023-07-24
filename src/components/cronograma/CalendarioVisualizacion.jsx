import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { getEvents } from "../../services/getEvents";
import "../../styles/cronograma/Cronograma.scss";
import { useMediaQuery } from "@material-ui/core"; // Importing useMediaQuery

const CalendarioVisualizacion = () => {
  const isDesktop = useMediaQuery("(min-width: 769px)"); // Using useMediaQuery hook for desktop view

  useEffect(() => {
    getEvents().then((data) => {
      setEventos(data);
    });
  }, []); 
  
  // Rest of the code...

  const getView = () => {
    return isDesktop ? "dayGridMonth" : "listWeek"; // Using isDesktop from useMediaQuery to determine the view mode
  };
 const [eventos, setEventos] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const handleEventClick = (info) => {
    const event = info.event;
    const { title, start, end } = event;

    setSelectedDay({
      title,
      fechaInicio: start,
      fechaFin: end ? end : null,
    });
  };

  const ajustarContenidoEvento = (info) => {
    const event = info.event;
    const { backgroundColor, textColor } = colorearEvento(event.extendedProps.tipo);

    // Verificar si es vista móvil o escritorio
    if (getView() === "listWeek") {
      // Vista móvil: Mostrar fecha de inicio y fin del evento
      return {
        html: `<div class="custom-event" style="background-color: ${backgroundColor}; color: ${textColor};">${event.title} - ${event.start.toLocaleDateString()} ${event.end ? `- ${event.end.toLocaleDateString()}` : ""}</div>`,
      };
    } else {
      // Vista de escritorio: Mostrar solo el título del evento
      return {
        html: `<div class="custom-event custom-event-circle" style="background-color: ${backgroundColor};"></div>`,
        backgroundColorClass: `event-background-${event.id}`, // Agregamos una clase con el color de fondo correspondiente
      };
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




  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    timeZone: "America/Bogota",
    eventClick: handleEventClick,
    locale: esLocale,
    events: eventos,
    editable: false,
    initialView: getView,
    eventContent: ajustarContenidoEvento,
   
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
  const getCalendarHeight = () => {
    return getView() === "listWeek" ? "600px" : "18rem";
  };
  return (
    <section
    style={{ height: getCalendarHeight(), marginTop: getView() === "listWeek" ? "8rem" : "10rem" }}
    className="seccionCalendarioVisualizacion"
    >
      <div className="seccionCalendarioVisualizacion__container">
        <div id="calendar" className={`custom-calendar ${getView() === "listWeek" ? "mobile-view" : "desktop-view"}`}>
          {getView() === "listWeek" && (
            <div className="seccionCalendarioVisualizacion__titulo">
              <h2>Agenda</h2>
              {selectedDay && <p>Día seleccionado: {selectedDay}</p>}
            </div>
          )}
          <FullCalendar {...calendarOptions} />
        </div>
        <div
          className="seccionCalendarioVisualizacion__eventDetails"
          style={{ display: getView() === "listWeek" ? "none" : "flex" }}
        >
          <div>
            <h1>Haga click en un evento para ver los detalles aquí</h1>
          </div>
          {selectedDay && (
            <div className="seccionCalendarioVisualizacion__eventoSeleccionado" style={{ display: getView() === "listWeek" ? "none" : "flex" }}>
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
      </div>
      {getView() === "listWeek" ? (
        // Vista móvil: Tabla de convenciones en el header
        <header>
          {renderConvenciones()}
        </header>
      ) : (
        // Vista de escritorio: Tabla de convenciones en el footer
        <footer>{renderConvenciones()}</footer>
      )}
    </section>
  );
};

export default CalendarioVisualizacion;

