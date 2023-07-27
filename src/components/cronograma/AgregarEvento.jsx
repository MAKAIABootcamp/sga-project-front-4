import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../redux/actions/eventsActions";
import "../../styles/cronograma/styleModal.scss";
import Swal from "sweetalert2";

const AgregarEvento = ({ show, onClose }) => {
  const [evento, setEvento] = useState({});
  const dispatch = useDispatch();
  const eventos = useSelector((store) => store.eventsReducer.eventos);
  console.log("eventos desde page estudiantes", eventos);

  const handleInputChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Obtener las fechas y horas del estado del evento
    console.log(evento);
    const { startDate, endDate, hourStart, hourEnd } = evento;

    // Crear objetos DateTime con las fechas y horas
    const startDateTime = DateTime.fromISO(startDate + "T" + hourStart);
    const endDateTime = DateTime.fromISO(endDate + "T" + hourEnd);

    // Formatear las fechas y horas en el formato deseado
    const formattedStart = startDateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss");
    const formattedEnd = endDateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss");

    // Crear el objeto con las propiedades title, start y end
    const formattedEvento = {
      title: evento.title,
      start: formattedStart,
      end: formattedEnd,
    };

    console.log(evento);
    dispatch(addEvent("eventos", formattedEvento));
    Swal.fire("Buen trabajo!", "Tu evento fue agregado con éxito!", "success");
    // setTimeout(() => {
    //   window.location.reload(); // Recargar la página después de 2 segundos
    // }, 1000);
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
                  value={evento.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <Form.Label>Fecha de fin</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={evento.endDate}
                  onChange={handleInputChange}
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
                  name="hourStart"
                  value={evento.hourStart}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <Form.Label>Hora de fin</Form.Label>
                <Form.Control
                  type="time"
                  name="hourEnd"
                  value={evento.hourEnd}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Form.Group>
          <div className="buttons__actions">
            <Button variant="primary" type="submit">
              Añadir evento
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AgregarEvento;
