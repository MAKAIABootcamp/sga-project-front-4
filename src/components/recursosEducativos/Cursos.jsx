import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CursoCard = ({ curso, onClick }) => {
  return (
    <div className="card">
      <img src={curso.imagen} className="card-img-top" alt={curso.titulo} />
      <div className="card-body">
        <h5 className="card-title">{curso.titulo}</h5>
        <p className="card-text">{curso.descripcion}</p>
        <p className="card-text">Duración: {curso.duracion}</p>
        <p className="card-text">Instructor: {curso.instructor}</p>
        <button className="btn btn-primary" onClick={onClick}>
          Ir al Curso
        </button>
      </div>
    </div>
  );
};

const Cursos = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    // Consumir los datos de los cursos desde los endpoints
    axios
      .all([
        axios.get("http://localhost:3000/eventosFrontend3"),
        axios.get("http://localhost:3000/eventosFrontend3"),

      ])
      .then((responses) => {
        // Obtener los datos de respuesta de cada endpoint
        const data1 = responses[0].data;
        const data2 = responses[1].data;
       

        // Actualizar el estado con los datos de los cursos
        setCursos([data1,data2]);
        log     })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
      });
  }, []);

  const handleCursoClick = (cursoId) => {
    // Redireccionar al usuario a la página del curso
    navigate(`/cursos/${cursoId}`);
  };

  return (
    <div>
      {cursos.map((curso) => (
        <CursoCard
          key={curso.id}
          curso={curso}
          onClick={() => handleCursoClick(curso.id)}
        />
      ))}
    </div>
  );
};

export default Cursos;
