import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "../styles/cronograma/Cronograma.scss";
import AgregarEvento from "../components/cronograma/AgregarEvento";
import { getEvents } from "../services/getEvents";

const Cronograma = () => {

  // Variable de estado para controlar la apertura y el cierre del modal
  const [showModal, setShowModal] = useState(false);

  const [eventos, setEventos] = useState([]);

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
    getEvents().then((data) => {
      setEventos(data);
    });
  }, []);


  const events = [
    { title: 'Evento 1', start: '2023-07-14T10:00:00', end: '2023-07-14T12:00:00' },
    { title: 'Evento 2', start: '2023-07-02T15:30:00', end: '2023-07-02T16:30:00' },
    { title: 'Evento 3', start: '2023-07-03T09:45:00', end: '2023-07-03T11:30:00' },
    { title: "Evento 4", date: "2023-07-02" },
    { title: "Evento 5", date: "2023-07-03" },
    
  ];

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
            timeZone= 'America/Bogota'
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

      {/* <Modal show={modalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="eventName">Nombre del evento:</label>
          <input
            type="text"
            id="eventName"
            className="form-control"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEventSubmit}>
            Guardar evento
          </Button>
          <Button variant="danger">
           Eliminar 
          </Button>
        </Modal.Footer>
      </Modal> */}
    </section>
  );
};

export default Cronograma;
