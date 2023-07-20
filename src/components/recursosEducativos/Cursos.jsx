import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchCourse } from '../../redux/actions/cursosActions';
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
    axios.get('http://localhost:3000/cursos')
      .then((response) => {
        const courses = response.data;
        setCursos(courses);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleCursoClick = (cursoId) => {
    dispatch(fetchCourse(cursoId));
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
