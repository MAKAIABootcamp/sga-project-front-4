import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { DateTime } from "luxon";

const AgregarEvento = ({
  show,
  onClose,
  onAgregarEvento,
  selectedDateString,
}) => {

  const [evento, setEvento] = useState({
    title: "",
    start: DateTime.local().toISO(),
    end: DateTime.local().toISO(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvento((prevEvento) => ({
      ...prevEvento,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Obtener las fechas y horas del estado del evento
    const { startDate, endDate, start, end } = evento;

    // Convertir las fechas y horas a objetos DateTime de Luxon
    const startDateTime = DateTime.fromISO(startDate + "T" + start);
    const endDateTime = DateTime.fromISO(endDate + "T" + end);

    // Actualizar el estado del evento con los valores formateados
    setEvento((prevEvento) => ({
      ...prevEvento,
      start: startDateTime.toISO(),
      end: endDateTime.toISO(),
    }));
  };

  useEffect(() => {
    console.log(evento);
  }, [evento]);

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
            <div className="row">
              <div className="col">
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={evento.startDate}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="col">
                <Form.Label>Fecha de fin</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={evento.endDate}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="row">
              <div className="col">
                <Form.Label>Hora de inicio</Form.Label>
                <Form.Control
                  type="time"
                  name="start"
                  value={evento.start}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <Form.Label>Hora de fin</Form.Label>
                <Form.Control
                  type="time"
                  name="end"
                  value={evento.end}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">Añadir evento</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgregarEvento;
