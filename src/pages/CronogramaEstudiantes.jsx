import Cronograma from '../components/cronograma/CalendarioVisualizacion';
import { format, isSameDay } from 'date-fns';
import { useState } from "react";
import esLocale from 'date-fns/locale/es';
import { useMediaQuery } from 'react-responsive';
const CalendarioConFechaActual = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  console.log(fechaActual);
   const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div>
 {isMobile && <p>{format(fechaActual, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: esLocale })}</p>}
 
      <Cronograma />
    </div>
  );
};

export default CalendarioConFechaActual;

