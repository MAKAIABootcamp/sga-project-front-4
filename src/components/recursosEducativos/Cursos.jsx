import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchCourse } from '../../redux/actions/cursosActions';
import { useSelector, useDispatch } from 'react-redux';

const Cursos = () => {
  const dispatch = useDispatch(); // Move dispatch to the top of the component function
  const [cursos, setCursos] = useState([]);
  const [cursoInfo, setCursoInfo] = useState({});
  const navigate = useNavigate();

  const handleCursoClick = (cursoId) => {
    dispatch(fetchCourse(cursoId));
    navigate(`/recursos-educativos/${cursoId}`);
  };

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft:"10px" , gap: "10px",paddingTop: '100px' }}>
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

const CursoCard = ({ curso, onClick }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{curso.titulo}</h5>
        <p className="card-text">Instructor: {curso.instructor}</p>
        <button onClick={() => onClick(curso.id)}>Agregar Material</button>
      </div>
    </div>
  );
};

export default Cursos;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CursoCard = ({ curso, onClick }) => {
//   return (
//     <div className="card">
//       <img src={curso.imagen} className="card-img-top" alt={curso.titulo} />
//       <div className="card-body">
//         <h5 className="card-title">{curso.titulo}</h5>
//         <p className="card-text">{curso.descripcion}</p>
//         <p className="card-text">Duración: {curso.duracion}</p>
//         <p className="card-text">Instructor: {curso.instructor}</p>
//         <button className="btn btn-primary" onClick={onClick}>
//           Ir al Curso
//         </button>
//       </div>
//     </div>
//   );
// };

// const Cursos = () => {
//   const navigate = useNavigate();
//   const [cursos, setCursos] = useState([]);

//   useEffect(() => {
//     // Consumir los datos de los cursos desde los endpoints
//     axios
//       .all([
//         axios.get("http://localhost:3000/eventosFrontend3"),

//       ])
//       .then((responses) => {
//         // Obtener los datos de respuesta de cada endpoint
//         const data1 = responses[0].data;
//         // const data2 = responses[1].data;
//         // const data3 = responses[2].data;

//         // Actualizar el estado con los datos de los cursos
//         setCursos([data1]);
//         console.log(cursos);    })
//       .catch((error) => {
//         console.error("Error al obtener los cursos:", error);
//       });
//   }, []);

//   const handleCursoClick = (cursoId) => {
//     const curso = cursos.find((curso) => curso.id === cursoId);
//     if (curso) {
//       navigate(`/agregarrecursoseducativos/${curso.titulo}`);
//     }
//   };
  

//   return (
//     <div>
//       {cursos.map((curso) => (
//         <CursoCard
//           key={curso.id}
//           curso={curso}
//           onClick={() => handleCursoClick(curso.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default Cursos;
