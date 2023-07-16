import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';

const AgregarEvento = ({ show, onClose, onAgregarEvento }) => {
  const [evento, setEvento] = useState({
    title: '',
    start: '',
    end: '',
  });

  const handleInputChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregarEvento(evento);
    setEvento({
      title: '',
      start: '',
      end: '',
    });
    console.log(evento)
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={evento.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hora de inicio</Form.Label>
            <Form.Control
              type="time"
              name="start"
              value={evento.start}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hora de fin</Form.Label>
            <Form.Control
              type="time"
              name="end"
              value={evento.end}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary">
            Añadir evento
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default AgregarEvento;
