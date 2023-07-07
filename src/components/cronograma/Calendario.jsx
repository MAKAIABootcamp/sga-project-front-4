import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDay } from 'date-fns';
import "../../styles/calendario.scss";
import { useSelector, useDispatch } from 'react-redux';
import { actualizarEventoSeleccionado } from '../../redux/actions/actions';

const Calendario = () => {
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const todoslosEventos = [
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
      esEntrega: false,
      categoria: "sprint"
    },
    {
      titulo: 'Clase de sociales',
      fechaInicio: new Date("2023-07-03T15:30:00"),
      fechaFin: new Date("2023-07-03T16:30:00"),
      detalles: 'Clase de matemáticas para repasar álgebra lineal.',
      esFestivo: false,
      esEntrega: false,
      categoria: "sprint"
    },
  ];

  const eventoSeleccionado = useSelector((state) => state.evento.eventoSeleccionado);
  const dispatch = useDispatch();

  const onClickDay = (date) => {
    const selectedEvent = todoslosEventos.find((evento) =>
      isSameDay(evento.fechaInicio, date)
    );

    dispatch(actualizarEventoSeleccionado(selectedEvent));
    console.log(selectedEvent);
  };
 const tieneEvento = todoslosEventos.filter(
      (evento) => !evento.esFestivo &&  !evento.esEntrega 
    );
    console.log(tieneEvento);
    const tieneEventoFestivo = todoslosEventos.filter(
      (evento) => evento.esFestivo &&  !evento.esEntrega 
    );   
    console.log(tieneEventoFestivo);
    const tieneEntrega = todoslosEventos.filter(
      (evento) => evento.esEntrega && !evento.esFestivo 
    ); 
    console.log(tieneEntrega);  

// seatElement.style.backgroundColor = seatStyle.backgroundColor;
// seatElement.style.borderRadius = seatStyle.borderRadius;
    let seatStyle = {
      backgroundColor: 'blue',
      borderRadius: '50%'
    };
    
    if (tieneEvento) {
      seatStyle.backgroundColor = 'red';
    } else if (tieneEntrega) {
      seatStyle.backgroundColor = 'white';
    }
    
    //
    // const colorearDias = (date) => {
    
    //   if (tieneEventoFestivo) {
    //     return "festivo"
        
    //   }
    
    //   if (tieneEntrega) {
    //     return   "entrega"
    //   }
    
    //   return {};
    // };
    
    const tileContent = ({ date, view }) => {
      const event = todoslosEventos.find((evento) =>
        isSameDay(evento.fechaInicio, date)
      );
  
      if (view === 'month' && event) {
        // Estilos para los días con eventos (que no son festivos ni entregas)
        if (!event.esFestivo && !event.esEntrega) {
          return (
            <div className="event-day">
              <div className="event-day__dot"></div>
            </div>
          );
        }
  
        // Estilos para los días festivos
        if (event.esFestivo) {
          return (
            <div className="event-day event-day--festive">
              <div className="event-day__dot event-day__dot--festive"></div>
            </div>
          );
        }
  
        // Estilos para los días de entrega
        if (event.esEntrega) {
          return (
            <div className="event-day event-day--delivery">
              <div className="event-day__dot event-day__dot--delivery"></div>
            </div>
          );
        }
      }
  
      return null;
    };
  return (
    <div className="container">
      <div className="division" id="division2">
        <Calendar
           className="custom-calendar"
           tileContent={tileContent}
           onClickDay={onClickDay}
           value={diasSeleccionados[0]}
        />
      </div>
    </div>
  );
};

export default Calendario;
