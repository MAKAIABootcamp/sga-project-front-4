import React, { useEffect, useRef,useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import '../styles/cronograma/Cronograma.scss'

const Cronograma = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventName, setEventName] = useState('');

  const handleDayClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEventName('');
  };

  const handleEventSubmit = () => {
    console.log(eventName);
    handleModalClose();
  };

  const events = [
    { title: 'Evento 1', date: '2023-07-14' },
    { title: 'Evento 2', date: '2023-07-02' },
    { title: 'Evento 3', date: '2023-07-03' },
  ];

  return (
    <main id='main' className='main'>
      <div className="container">
        <div id="calendar" className="custom-calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale= {esLocale}
            headerToolbar={{
              left: 'prev next today',
              center: 'title',
              right: 'dayGridMonth timeGridWeek listWeek'
            }}
            events={events}
            editable={true}
            dateClick={handleDayClick}
          />
        </div>
      </div>
      <Modal show={modalOpen} onHide={handleModalClose}>
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
      </Modal>
    </main>
  );
}

export default Cronograma;
