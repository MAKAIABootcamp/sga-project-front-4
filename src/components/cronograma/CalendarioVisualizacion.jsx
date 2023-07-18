import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "../../styles/cronograma/Cronograma.scss";
import { getEvents } from "../../services/getEvents";

const CronogramaEstudiantes = () => {
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
      const { title, start, end } = event;
  
      alert(`Detalles del evento:
        Título: ${title}
        Fecha de inicio: ${start.toLocaleDateString()}
        Fecha de fin: ${end ? end.toLocaleDateString() : 'N/A'}`);
    }
  };

  const colorearEvento = (tipo) => {
    let backgroundColor = "#3788D8"; // Por defecto: azul
    let textColor = "#FFFFFF"; // Por defecto: blanco
  
    if (tipo === "festivo") {
      backgroundColor = "#E74C3C"; // Festivos: rojo
      textColor = "#FF0000"; // Festivos: rojo
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
        html: `<div class="custom-event" style="background-color: ${backgroundColor}; color: ${textColor};">${event.title}</div>`,
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
    <section>
      <div className="container" style={{ padding: isMobile ? "8rem" : "8rem" }}>
        <div id="calendar" className="custom-calendar">
          {isMobile && (
            <div>
              <h2>Agenda</h2>
              {selectedWeek && <p>Semana seleccionada: {selectedWeek}</p>}
              {selectedDay && <p>Día seleccionado: {selectedDay}</p>}
            </div>
          )}
          <FullCalendar {...calendarOptions} />
        </div>
      </div>
    </section>
  );
};

export default CronogramaEstudiantes;




// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import listPlugin from "@fullcalendar/list";
// import esLocale from "@fullcalendar/core/locales/es";
// import "../../styles/cronograma/Cronograma.scss";
// import { getEvents } from "../../services/getEvents";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

// const Cronograma = () => {
//   const [eventos, setEventos] = useState([]);

//   useEffect(() => {
//     getEvents().then((data) => {
//       setEventos(data);
//     });
//   }, []);

//   const eventContent = (info) => {
//     const event = info.event;

//     let backgroundColor = "#3788D8"; // Por defecto: azul
//     let textColor = "#FFFFFF"; // Por defecto: blanco

//     if (event.extendedProps.tipo === "festivo") {
//       backgroundColor = "#E74C3C"; // Festivos: rojo
//       textColor = "#FF0000"; // Festivos: rojo
//     } else if (event.extendedProps.tipo === "entrega") {
//       backgroundColor = "#27AE60"; // Entregas: verde
//     } else if (event.extendedProps.tipo === "clase") {
//       backgroundColor = "#F39C12"; // Clases: amarillo
//     }

//     return {
//       html: `<div class="custom-event" style="background-color: ${backgroundColor}; color: ${textColor};">${event.title}</div>`,
//     };
//   };

//   return (
//     <section>
//       <div className="container" style={{ padding: "8rem" }}>
//         <div id="calendar" className="custom-calendar">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
//             timeZone="America/Bogota"
//             initialView="dayGridMonth"
//             locale={esLocale}
//             headerToolbar={{
//               start: "prev,next today",
//               center: "title",
//               end: "dayGridMonth,timeGridWeek,listWeek",
//             }}
//             events={eventos}
//             editable={false}
//             eventContent={eventContent}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cronograma;
