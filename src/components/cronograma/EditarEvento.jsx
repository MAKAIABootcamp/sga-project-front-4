import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, deleteEvent } from "../../redux/actions/eventsActions";
import "../../styles/cronograma/styleModal.scss";
import Swal from "sweetalert2";

const EditarEvento = ({ show, onClose, eventoSeleccionado }) => {

  const dispatch = useDispatch();

  // TRATAMIENTO DE FECHAS INICIO Y FIN
  const startDateTime = eventoSeleccionado.start;
  const startDate = DateTime.fromISO(startDateTime).toFormat('yyyy-MM-dd');

  const endDateTime = eventoSeleccionado.end;
  const endDate = DateTime.fromISO(endDateTime).toFormat('yyyy-MM-dd');

  // TRATAMIENTO DE HORAS INICIO Y FIN
  const startHourTime = eventoSeleccionado.start;
  const startHour = DateTime.fromISO(startHourTime).toFormat('HH:mm');

  const endHourTime = eventoSeleccionado.end;
  const endHour = DateTime.fromISO(endHourTime).toFormat('HH:mm');



  const informacion = {
    title: eventoSeleccionado.title,
    startDate: startDate,
    endDate: endDate,
    startHour: startHour,
    endHour: endHour
  }

  console.log(informacion)
  // const handleInputChange = (e) => {
  //   setEvento({
  //     ...evento,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleEliminarAdmin = (id) => {
    dispatch(deleteEvent("eventos", id));
    Swal.fire(
      'Buen trabajo!',
      'Tu evento fue eliminado con éxito!',
      'success'
    )
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    console.log(eventoSeleccionado);
  }, [eventoSeleccionado]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={informacion.title}
            />
          </Form.Group>
          <Form.Group>
            <div className="row">
              <div className="col">
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={informacion.startDate}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <Form.Label>Fecha de fin</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={informacion.endDate}
                  // onChange={handleInputChange}
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
                  value={informacion.startHour}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <Form.Label>Hora de fin</Form.Label>
                <Form.Control
                  type="time"
                  name="hourEnd"
                  value={informacion.endHour}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
          </Form.Group>
          <div className="buttons__actions">
            <Button variant="primary" type="submit">
              Actualizar evento
            </Button>
            <Button
              variant="danger"
              onClick={() => handleEliminarAdmin(eventoSeleccionado.id)}
            >
              Eliminar evento
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

export default EditarEvento;
