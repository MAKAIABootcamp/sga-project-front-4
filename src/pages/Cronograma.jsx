import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "../styles/cronograma/Cronograma.scss";
import AgregarEvento from "../components/cronograma/AgregarEvento";
import { useDispatch, useSelector } from "react-redux";
import { listEvents } from "../redux/actions/eventsActions";

const Cronograma = () => {
  const dispatch = useDispatch();
  // Variable de estado para controlar la apertura y el cierre del modal
  const [showModal, setShowModal] = useState(false);

  const eventos = useSelector((store) => store.eventsReducer.eventos);
  console.log("eventos desde page estudiantes", eventos);



  // Para abrir el modal al darle click a un día
  const handleDayClick = () => {
    setShowModal(true);
  };

  // Para cerrar el modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  // Para agregar un evento, acá debería ir la lógica del post a la base de datos, revisar el getAPI de full calendar
  const handleAgregarEvento = (evento) => {
    console.log(evento);
    handleModalClose();
  };

  useEffect(() => {
    dispatch(listEvents("eventos"));
  }, [dispatch]);

  return (
    <section>
      <div className="container" style={{ padding: "8rem" }}>
        <div id="calendar" className="custom-calendar">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            timeZone="America/Bogota"
            initialView="dayGridMonth"
            locale={esLocale}
            headerToolbar={{
              left: "prev next today",
              center: "title",
              right: "dayGridMonth timeGridWeek listWeek",
            }}
            events={eventos}
            editable={true}
            dateClick={handleDayClick}
          />
        </div>
      </div>
      <AgregarEvento
        show={showModal}
        onClose={handleModalClose}
        onAgregarEvento={handleAgregarEvento}
      />
    </section>
  );
};

export default Cronograma