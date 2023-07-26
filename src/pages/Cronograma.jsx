import React, { useEffect, useState } from "react";
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
import { Button } from "react-bootstrap";
import EditarEvento from "../components/cronograma/EditarEvento";

const Cronograma = () => {
  const dispatch = useDispatch();
  // Variable de estado para controlar la apertura y el cierre del modal
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState({});


  const eventos = useSelector((store) => store.eventsReducer.eventos);
  console.log("eventos desde page estudiantes", eventos);



  // Para abrir el modal al darle click a un día
  const handleDayClick = (info) => {
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    // Abre el modal
    // setShowModal(true);
    console.log(event)
    let eventoSeleccionado = {
      id: event.event.id,
      title: event.event.title,
      start: event.event.startStr,
      end: event.event.endStr
    }
    setEventoSeleccionado(eventoSeleccionado)
    setShowModalEdit(true);
  };

  // Para cerrar el modal
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalCloseEdit = () => {
    setShowModalEdit(false);
  };

  // Para agregar un evento, acá debería ir la lógica del post a la base de datos, revisar el getAPI de full calendar
  const handleAgregarEvento = (evento) => {
    const formattedStart = moment(evento.start).format("YYYY-MM-DDTHH:mm:ss");
    const formattedEnd = moment(evento.end).format("YYYY-MM-DDTHH:mm:ss");

    const newEvento = {
      title: evento.title,
      start: formattedStart,
      end: formattedEnd,
    };

    console.log(newEvento);
    handleModalClose();
  };

  useEffect(() => {
    dispatch(listEvents("eventos"));
  }, [dispatch]);

  return (
    <section style={{width: "100%"}}>
      <div className="container" style={{ padding: "4rem" }}>
        <div id="calendar" className="custom-calendar">
        <div className="d-flex justify-content-end">
          <Button onClick={handleDayClick} variant="primary" className="mb-2">Agregar evento</Button>
        </div>
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
              right: "dayGridMonth timeGridWeek timeGridDay listWeek",
            }}
            events={eventos}
            editable={true}
            dateClick={handleDayClick}
            eventClick={handleEventClick}
            slotLabelFormat={{
              hour: "numeric",
              hour12: true,
            }}
          />
        </div>
      </div>
      <AgregarEvento
        show={showModal}
        onClose={handleModalClose}
      />
      <EditarEvento
        show={showModalEdit}
        onClose={handleModalCloseEdit}
        eventoSeleccionado={eventoSeleccionado}
      />
    </section>
  );
};

export default Cronograma;
