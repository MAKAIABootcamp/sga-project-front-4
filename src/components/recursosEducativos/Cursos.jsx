import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchCourse } from '../../redux/actions/cursosActions';
import { useSelector, useDispatch } from 'react-redux';
import { getCursos } from "../../services/getCursos";
const CursoCard = ({ curso, onClick }) => {
  return (
    <div className="card">

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
     const dispatch = useDispatch(); 
     const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);

  


  useEffect(() => {
    getCursos().then((courses) => {
   setCursos(courses); 
    });
  }, []);
  

    const handleCursoClick = (cursoId) => {
      dispatch(fetchCourse(cursoId));
     
      navigate(`/recursos-educativos/${cursoId}`);
    };

  return (
    <div  style={{ display: 'flex', flexDirection: 'column', paddingLeft:"10px" , gap: "10px",paddingTop: '100px' }}>
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


