import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const AgregarEvento = ({
  show,
  onClose,
  onAgregarEvento,
  selectedDateString,
}) => {

  const [evento, setEvento] = useState({
    title: "",
    start: "YYYY-MM-DDTHH:mm:ss",
    end: "",
  });

  const handleInputChange = (e) => {
    setEvento({
      ...evento
    });
    console.log(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedStart = moment(selectedDateString + ' ' + evento.start, 'YYYY-MM-DD HH:mm').format();
    const formattedEnd = moment(selectedDateString + ' ' + evento.end, 'YYYY-MM-DD HH:mm').format();

    const updatedEvento = { ...evento, start: formattedStart, end: formattedEnd };
    onAgregarEvento(updatedEvento);
  };

  useEffect(() => {
    console.log(evento);
  }, [evento]);

    const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    console.log(date)
    setSelectedDate(date);
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
            <div className="row">
              <div className="col">
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={selectedDateString}
                  onChange={handleInputChange}
                  readOnly
                />
                 <Datetime value={selectedDate} onChange={handleDateChange} />
              </div>
              <div className="col">
                <Form.Label>Fecha de fin</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={selectedDateString}
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
