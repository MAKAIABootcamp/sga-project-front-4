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
