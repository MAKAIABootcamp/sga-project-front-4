import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../styles/recursoseducativos/cursos.scss";

const RecursosEducativos = ({ tituloCurso }) => {
  const [modulo, setModulo] = useState('');
  const [tipoRecurso, setTipoRecurso] = useState('grabacion');
  const [enlaceGrabacion, setEnlaceGrabacion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState('');
  const [serverResponse, setServerResponse] = useState(null);

  const handleModuloChange = (e) => {
    setModulo(e.target.value);
  };

  const handleTipoRecursoChange = (e) => {
    setTipoRecurso(e.target.value);
    setEnlaceGrabacion('');
    setArchivo(null);
    setError('');
  };

  const handleEnlaceGrabacionChange = (e) => {
    setEnlaceGrabacion(e.target.value);
  };

  const handleArchivoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2000000) {
      setArchivo(selectedFile);
      setError('');
      // Add the following line to display the file name
      console.log(selectedFile.name);
    } else {
      setArchivo(null);
      setError('El archivo debe ser en formato PDF o Word y tener un tamaño máximo de 2MB.');
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      modulo,
      tipoRecurso,
      enlaceGrabacion,
      archivo
    };
  
    axios.post('http://localhost:3000/recursosEndpoint1', data)
      .then(response => {
        setServerResponse(response.data); // Guarda la respuesta del servidor en el estado
        localStorage.setItem('serverResponse', JSON.stringify(response.data)); // Guarda la respuesta en el localStorage
      })
      .catch(error => {
        console.error(error);
      });

      
  };
  const storedResponses = localStorage.getItem('serverResponse');
  const parsedResponses = storedResponses ? JSON.parse(storedResponses) : [];

  return (
    <div style={{ marginTop: '54px' }} className='inputs'>
      <div id='divisionprincipal'>
        <form onSubmit={handleSubmit} class="division">
          <section>
            <h1>Recursos Educativos</h1>
          </section>
          <div className='inputs__input'>
            <label htmlFor="modulo">Módulo:</label>
            <input type="text" id="modulo" value={modulo} onChange={handleModuloChange} required />
          </div>
          <div className='inputs__input'>
            <label htmlFor="tipoRecurso">Tipo de Recurso:</label>
            <select id="tipoRecurso" value={tipoRecurso} onChange={handleTipoRecursoChange}>
              <option value="grabacion">Grabación de Clase</option>
              <option value="diapositivas">Diapositivas de Clase</option>
              <option value="lectura">Material de Lectura</option>
              <option value="ejercicios">Ejercicios</option>
              <option value="ejercicios_obligatorios">Ejercicios Obligatorios</option>
            </select>
          </div>
          {tipoRecurso === 'grabacion' && (
            <div className='inputs__input'>
              <label htmlFor="enlaceGrabacion">Enlace de Grabación:</label>
              <input type="text" id="enlaceGrabacion" value={enlaceGrabacion} onChange={handleEnlaceGrabacionChange} required />
            </div>
          )}
          {tipoRecurso !== 'grabacion' && (
            <div className='inputs__input'>
              <label htmlFor="archivo">Archivo:</label>
              <input type="file" id="archivo" onChange={handleArchivoChange} accept=".pdf,.doc,.docx" required />
              {error && <p>{error}</p>}
            </div>
          )}
          <section>
            <button type="submit">Subir Archivo</button>
          </section>

        </form>   
        <div className="card-container inputs__respuesta">
    {Array.isArray(parsedResponses) &&
      parsedResponses.map((response, index) => (
        <div className="card" key={index}>
          <h3>Respuesta {index + 1}</h3>
          <p>Modulo: {response.modulo}</p>
          <p>Tipo de Recurso: {response.tipoRecurso}</p>
          {/* Mostrar otros campos almacenados */}
        </div>
      ))}
  </div>
      </div>

      {/* <div id='logo' > <img src='../../../src/assets/images/logoMakaia.png'alt="logo makaia"></img></div> */}

      <div id='logo2' className="division"> </div>

    </div>

  );
};

export default RecursosEducativos;


// import React, { useState } from 'react';
// import axios from 'axios';

// const RecursosEducativos = () => {
//   const [file, setFile] = useState(null);
//   const [modulo, setModulo] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleModuloChange = (e) => {
//     setModulo(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (file && modulo) {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('modulo', modulo);

//       axios.post('/api/upload', formData)
//         .then(response => {
//           console.log(response.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   };

//   return (
//     <div>
//       <h1>Recursos Educativos</h1>
//       <form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
//         <input type="file" onChange={handleFileChange} />
//         <input type="text" value={modulo} onChange={handleModuloChange} placeholder="Nombre del módulo" />
//         <button type="submit">Subir Archivo</button>
//       </form>
//     </div>
//   );
// };

// export default RecursosEducativos;
