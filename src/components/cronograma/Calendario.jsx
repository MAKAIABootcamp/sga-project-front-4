import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';

const Calendario = () => {
  const [eventos, setEventos] = useState([
    {
      titulo: 'Clase de Matemáticas',
      fechaInicio: new Date(2023, 5, 1), // 1 de junio de 2023
      fechaFin: new Date(2023, 5, 1), // 1 de junio de 2023
      detalles: 'Clase de matemáticas para repasar álgebra lineal.',
      esFestivo: false, // No es un día festivo
    },
    // ...otros eventos
  ]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const colorearDias = (date) => {
    const estilo = {};

    const esDiaFestivo = eventos.some(
      (evento) => evento.esFestivo && isSameDay(evento.fechaInicio, date)
    );

    const tieneEvento = eventos.some(
      (evento) => !evento.esFestivo && isSameDay(evento.fechaInicio, date)
    );

    if (esDiaFestivo) {
      estilo.backgroundColor = 'red';
      estilo.color = 'white';
    }

    if (tieneEvento) {
      estilo.backgroundColor = 'green';
      estilo.color = 'white';
    }

    return estilo;
  };

  const onClickDay = (date) => {
    const selectedEvent = eventos.find((evento) =>
      isSameDay(evento.fechaInicio, date)
    );

    setEventoSeleccionado(selectedEvent);
  };

  const EventDetails = ({ evento }) => (
    <div className="evento-seleccionado">
      <h3>{evento.titulo}</h3>
      <p>{evento.detalles}</p>
      <p>Hora: {format(evento.fechaInicio, 'HH:mm')}</p>
    </div>
  );

  return (
    <div>
      <h2>Calendario</h2>
      <Calendar
        tileClassName={({ date }) => {
          const estiloDia = colorearDias(date);
          return Object.keys(estiloDia).join(' ');
        }}
        onClickDay={onClickDay}
      />
      {eventoSeleccionado && <EventDetails evento={eventoSeleccionado} />}
    </div>
  );
};

export default Calendario;

// import React,{useState} from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { isSameDay } from 'date-fns';

// const Calendario = () => {
//     const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  
//     const colorearDias = (date) => {
//       const estilo = {};
  
//       const esDiaFestivo = eventos.some(
//         (evento) =>
//           evento.esFestivo && isSameDay(evento.fechaInicio, date)
//       );
  
//       const tieneEvento = eventos.some(
//         (evento) =>
//           !evento.esFestivo && isSameDay(evento.fechaInicio, date)
//       );
  
//       if (esDiaFestivo) {
//         estilo.backgroundColor = 'red';
//         estilo.color = 'white';
//       }
  
//       if (tieneEvento) {
//         estilo.backgroundColor = 'green';
//         estilo.color = 'white';
//       }
  
//       return estilo;
//     };
  
//     const eventos = [
//       {
//         titulo: 'Clase de Matemáticas',
//         fechaInicio: new Date(2023, 5, 1), // 1 de junio de 2023
//         fechaFin: new Date(2023, 5, 1), // 1 de junio de 2023
//         detalles: 'Clase de matemáticas para repasar álgebra lineal.',
//         esFestivo: false, // No es un día festivo
//       },
//       {
//         titulo: 'Clase de Historia',
//         fechaInicio: new Date(2023, 5, 5), // 5 de junio de 2023
//         fechaFin: new Date(2023, 5, 5), // 5 de junio de 2023
//         detalles: 'Clase de historia antigua sobre el Imperio Romano.',
//         esFestivo: false, // No es un día festivo
//       },
//       {
//         titulo: 'Actividad de Proyecto',
//         fechaInicio: new Date(2023, 5, 10), // 10 de junio de 2023
//         fechaFin: new Date(2023, 5, 16), // 16 de junio de 2023
//         detalles: 'Trabajar en el proyecto grupal de ciencias.',
//         esFestivo: false, // No es un día festivo
//       },
//       {
//         titulo: 'Día Festivo',
//         fechaInicio: new Date(2023, 5, 20), // 20 de junio de 2023 (Día festivo)
//         fechaFin: new Date(2023, 5, 20), // 20 de junio de 2023 (Día festivo)
//         detalles: 'Día festivo en Colombia.',
//         esFestivo: true, // Es un día festivo
//       },
//     ];
  
//     return (
//       <div>
//         <h2>Calendario</h2>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateRangePicker
//             renderInput={(startProps, endProps) => (
//               <div>
//                 <input {...startProps.input} />
//                 <input {...endProps.input} />
//               </div>
//             )}
//             value={[eventos[0].fechaInicio, eventos[0].fechaFin]}
//             onChange={(newValue) => {
//               console.log(newValue);
//             }}
//             onCalendarChange={(date) => {
//               const selectedEvent = eventos.find((evento) =>
//                 isSameDay(evento.fechaInicio, date)
//               );
  
//               setEventoSeleccionado(selectedEvent);
//             }}
//             renderDay={(day, _value, DayComponentProps) => {
//               const estiloDia = colorearDias(day);
  
//               return (
//                 <DayComponentProps
//                   {...DayComponentProps}
//                   style={estiloDia}
//                 />
//               );
//             }}
//           />
//           <button id="verde"></button>
//           <button id="azul"></button>
//           {eventoSeleccionado && (
//             <div className="evento-seleccionado">
//               <h3>{eventoSeleccionado.titulo}</h3>
//               <p>{eventoSeleccionado.detalles}</p>
//               <p>
//                 Hora: {eventoSeleccionado.fechaInicio.toLocaleTimeString()}
//               </p>
//             </div>
//           )}
//         </LocalizationProvider>
//       </div>
//     );
//   };
  
//   export default Calendario;