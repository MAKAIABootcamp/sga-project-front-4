import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchCourse } from '../../redux/actions/cursosActions';
import { getCursos } from "../../services/getCursos";
import CursoCard from "../cursos/CursoCard"; // Assuming CursoCard is imported from the correct file path

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
    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: "10px", gap: "10px", paddingTop: '100px' }}>
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
