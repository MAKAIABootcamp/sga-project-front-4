import React from 'react'
import "../../styles/calendario.scss";
import { useSelector } from 'react-redux';
import { isSameDay } from 'date-fns';
const Evento = () => {
    const eventoSeleccionado = useSelector(state => state.evento.eventoSeleccionado);
console.log(eventoSeleccionado);
const getFormattedTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amOrPm = hours >= 12 ? "pm" : "am";
      
        // Convertir las horas al formato de 12 horas
        const formattedHours = hours % 12 || 12;
      
        return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${amOrPm}`;
      };
    
    const EventDetails = ({ evento }) => (
        <div className="evento-seleccionado">
          <h3>{evento.titulo}:</h3>
          <h2> {getFormattedTime(evento.fechaInicio)} -</h2>
          <h2>{getFormattedTime(evento.fechaFin)}</h2>
        </div>
      );
    
  return (
    <div className="division" id='division1'>
    {eventoSeleccionado && <EventDetails evento={eventoSeleccionado} />}
  </div>
  )
}

export default Evento