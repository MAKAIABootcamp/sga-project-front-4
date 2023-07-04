import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDay } from 'date-fns';
import "../../styles/calendario.scss";
import { useSelector, useDispatch } from 'react-redux';
import { actualizarEventoSeleccionado } from '../../redux/actions/actions';

const Calendario = () => {
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const eventos = useSelector((state) => state.eventos);
 const eventoSeleccionado = useSelector((state) => state.evento.eventoSeleccionado);

  const dispatch = useDispatch();
  const [todoslosEventos, setTodosLosEventos] = useState([
        {
          titulo: 'Clase de ',
          fechaInicio: new Date("2023-07-02T15:30:00"),
          fechaFin: new Date("2023-07-02T16:30:00"),
          detalles: 'Clase de matemáticas para repasar álgebra lineal.',
          esFestivo: false,
          esEntrega: true,
          categoria: "sprint"
        },
        {
          titulo: 'Clase de Matemáticas',
          fechaInicio: new Date("2023-07-03T15:30:00"),
          fechaFin: new Date("2023-07-03T16:30:00"),
          detalles: 'Clase de matemáticas para repasar álgebra lineal.',
          esFestivo: true,
          esEntrega: true,
          categoria: "sprint"
        },
        // ... otros eventos
      ]);
    
      const onClickDay = (date) => {
        const selectedEvent = todoslosEventos.find((evento) =>
          isSameDay(evento.fechaInicio, date)
        );
      
        dispatch(actualizarEventoSeleccionado(selectedEvent))
        console.log(selectedEvent);;
      };
      

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const esDiaFestivo = eventos.some(
        (evento) => evento.esFestivo && isSameDay(evento.fechaInicio, date)
      );

      const tieneEvento = eventos.some(
        (evento) => !evento.esFestivo && isSameDay(evento.fechaInicio, date)
      );

      const isSelected = diasSeleccionados.some((dia) => isSameDay(dia, date));

      if (esDiaFestivo) {
        return <div className={`festivo-marker ${isSelected ? 'selected' : ''}`} />;
      }

      if (tieneEvento) {
        return <div className={`evento-marker ${isSelected ? 'selected' : ''}`} />;
      }
    }

    return null;
  };

  return (
    <div className="container">
      <div className="division" id='division2'>
        <Calendar
          className="custom-calendar"
          onClickDay={onClickDay}
          tileContent={renderTileContent}
          value={diasSeleccionados[0]}
        />
      </div>
 
    </div>
  );
};

export default Calendario;

// import React, { useState, useRef, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { format, isSameDay } from 'date-fns';
// import "../../styles/calendario.scss";
// import { useSelector, useDispatch } from 'react-redux';
// import { actualizarEventoSeleccionado } from '../../redux/actions/actions';
// const Calendario = () => {
//   const [diasSeleccionados, setDiasSeleccionados] = useState([]);
//   const eventosState = useSelector((state) => state.eventos);
//   const eventoSeleccionado = useSelector((state) => state.evento.eventoSeleccionado); // Accede al evento seleccionado desde el estado
//   const dispatch = useDispatch();

//   const actualizarEventos = (nuevosEventos) => {
//     // Despacha la acción para actualizar los eventos
//     dispatch({ type: 'ACTUALIZAR_EVENTOS', payload: nuevosEventos });
//   };


//  
 
//   const renderTileContent = ({ date, view }) => {
//     if (view === 'month') {
//       const esDiaFestivo = eventos.some(
//         (evento) => evento.esFestivo && isSameDay(evento.fechaInicio, date)
//       );
  
//       const tieneEvento = eventos.some(
//         (evento) => !evento.esFestivo && isSameDay(evento.fechaInicio, date)
//       );
  
//       const isSelected = diasSeleccionados.some((dia) => isSameDay(dia, date));
  
//       if (esDiaFestivo) {
//         return <div className={`festivo-marker ${isSelected ? 'selected' : ''}`} />;
//       }
  
//       if (tieneEvento) {
//         return <div className={`evento-marker ${isSelected ? 'selected' : ''}`} />;
//       }
//     }
  
//     return null;
//   };
  

//   const tieneEvento = (date) => {
//     return eventos.some((evento) => evento.esFestivo && isSameDay(evento.fechaInicio, date));
//   };
//   const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
//   const onClickDay = (date) => {
//     const selectedEvent = eventos.find((evento) =>
//       isSameDay(evento.fechaInicio, date)
//     );
  
//     setEventoSeleccionado(selectedEvent);
  
//     // Agregar la clase .event-selected al elemento seleccionado
//     const selectedElement = document.querySelector('.react-calendar__tile--has-event.react-calendar__tile--active');
//     if (selectedElement) {
//       selectedElement.classList.add('event-selected');
//     }
//   };
  
  
//    const calendarRef = useRef(null); 
//   // const handleOutsideClick = (event) => {
//   //   // Comprobar si el clic ocurrió fuera del calendario
//   //   if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//   //     setEventoSeleccionado(null); // Limpiar evento seleccionado
//   //   }
//   // };

//   // useEffect(() => {
//   //   // Agregar el manejador de eventos en el montaje del componente
//   //   document.addEventListener('click', handleOutsideClick);

//   //   // Limpiar el manejador de eventos en el desmontaje del componente
//   //   return () => {
//   //     document.removeEventListener('click', handleOutsideClick);
//   //   };
//   // }, []);


//   const getFormattedTime = (date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const amOrPm = hours >= 12 ? "pm" : "am";
  
//     // Convertir las horas al formato de 12 horas
//     const formattedHours = hours % 12 || 12;
  
//     return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${amOrPm}`;
//   };


//   return (
//     <div className="container">
//       <div className="division" id='division2'>
//       <Calendar
//       ref={calendarRef}
//         className="custom-calendar"
//         onClickDay={onClickDay}
//         tileContent={renderTileContent}
//       />
//       </div>
      
     
//     </div>
//   );
// }

// export default Calendario;


