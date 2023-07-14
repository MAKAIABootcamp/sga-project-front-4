import Calendario from "../components/cronograma/Calendario";
import "../styles/calendario.scss";
import Evento from "../components/cronograma/Evento";

const CalendarioConFechaActual = () => {
  return (
    <div className="calendario">  
      <Calendario  />
      <Evento></Evento>
    </div>
  );
};

export default CalendarioConFechaActual;