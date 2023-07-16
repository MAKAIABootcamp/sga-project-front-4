import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/recursoseducativos/cursos.scss";
const CursoCard = ({ curso, handleCursoClick }) => {
  return (
    <div className="card" style={{ marginTop: '106px' }}>
      <div className="card-body">
        <h5 className="card-title">{curso.titulo}</h5>
        <p className="card-text">Instructor: {curso.instructor}</p>
        <button onClick={() => handleCursoClick(curso.titulo)}>Agregar Material</button>
      </div>
    </div>
  );
};

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoInfo, setCursoInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/eventosFrontend3")
      .then((response) => {
        const data = response.data;
        setCursos(data);
        const curso = data.find(item => item.curso !== undefined)?.curso;
        if (curso) {
          setCursoInfo(curso);
          console.log(curso.titulo); // "Título del Curso"
          console.log(curso.descripcion); // "Descripción del curso"
          console.log(curso.duracion); // "4 horas"
          console.log(curso.instructor); // "Nombre del Instructor"
        }
      })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
      });
  }, []);

  const handleCursoClick = (titulo) => {
    navigate(`/agregarrecursoseducativos/${titulo}`);
  };

  return (
    <div>
      <CursoCard curso={cursoInfo} handleCursoClick={handleCursoClick} />


    </div>
  );
};

export default Cursos;

