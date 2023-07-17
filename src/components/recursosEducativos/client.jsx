import React, { useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@material-ui/core';
import "../../styles/recursos/RecursosDocentes.scss"
const RecursosEducativos = ({ tituloCurso }) => {
  const isDesktop = useMediaQuery('(min-width: 769px)'); // Verifica si la pantalla es desktop o no

  const [modulo, setModulo] = useState('');
  const [tipoRecurso, setTipoRecurso] = useState('grabacion');
  const [enlaceGrabacion, setEnlaceGrabacion] = useState('');
  const [archivos, setArchivos] = useState({});
  const [error, setError] = useState('');
  const [serverResponse, setServerResponse] = useState(null);

  const handleModuloChange = (e) => {
    setModulo(e.target.value);
  };

  const handleTipoRecursoChange = (e) => {
    setTipoRecurso(e.target.value);
    setEnlaceGrabacion('');
    setArchivos({});
    setError('');
  };

  const handleEnlaceGrabacionChange = (e) => {
    setEnlaceGrabacion(e.target.value);
  };

  const handleArchivoChange = (e, tipoRecurso) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2000000) {
      setArchivos(prevState => ({ ...prevState, [tipoRecurso]: selectedFile }));
      setError('');
    } else {
      setArchivos(prevState => ({ ...prevState, [tipoRecurso]: null }));
      setError('El archivo debe ser en formato PDF o Word y tener un tamaño máximo de 2MB.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      modulo,
      tipoRecurso,
      enlaceGrabacion,
      archivos
    };

    axios.post('http://localhost:3000/recursosEndpoint1', data)
      .then(response => {
        setServerResponse(response.data);
        localStorage.setItem('serverResponse', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const storedResponses = localStorage.getItem('serverResponse');
  const parsedResponses = storedResponses ? JSON.parse(storedResponses) : [];

  if (!isDesktop) {
    return (
      <div  className="inputs">
    
        <div id="divisionprincipal">
          <form onSubmit={handleSubmit} className="division">
            <section style={{ backgroundColor: " #B5B2B2", padding: "10px 20px", borderRadius: "5px" }} className='inputs__titulo'>
              <h1>Material de estudio</h1>
            </section>
            <div className="inputs__input">
              <label htmlFor="modulo">Módulo:</label>
              <input type="text" id="modulo" value={modulo} onChange={handleModuloChange} required />
            </div>
            <div className="inputs__input">
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
              <div className="inputs__input">
                <label htmlFor="enlaceGrabacion">Enlace de Grabación:</label>
                <input type="text" id="enlaceGrabacion" value={enlaceGrabacion} onChange={handleEnlaceGrabacionChange} required />
              </div>
            )}
            {tipoRecurso !== 'grabacion' && (
              <div className="inputs__input">
                <label htmlFor="archivo">Archivo:</label>
                <input type="file" id="archivo" onChange={(e) => handleArchivoChange(e, tipoRecurso)} accept=".pdf,.doc,.docx" required />
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
      </div>
    );
  }

  return (
    <div className="inputs">

<div style={{ backgroundColor: " #B5B2B2", padding: "10px 122px", borderRadius: "5px" }} className='inputs__titulo'>

      <h1>Material de estudio</h1>
</div>


      <div>
        <input type="text" />
        <button type="submit"></button>
      </div>
      <section>
        <h2>Diapositivas de la clase</h2>
        <label htmlFor="diapositivasInput">
          <img src="ruta-a-tu-imagen" alt="Diapositivas" />
          <input
            type="file"
            id="diapositivasInput"
            onChange={(e) => handleArchivoChange(e, 'diapositivas')}
            accept=".pdf,.doc,.docx"
            required
          />
        </label>
        {error && <p>{error}</p>}
      </section>
      <section>
        <h2>Material de lectura</h2>
        <label htmlFor="lecturaInput">
          <img src="ruta-a-tu-imagen" alt="Material de lectura" />
          <input
            type="file"
            id="lecturaInput"
            onChange={(e) => handleArchivoChange(e, 'lectura')}
            accept=".pdf,.doc,.docx"
            required
          />
        </label>
        {error && <p>{error}</p>}
      </section>
      <section>
        <h2>Ejercicios</h2>
        <label htmlFor="ejerciciosInput">
          <img src="ruta-a-tu-imagen" alt="Ejercicios" />
          <input
            type="file"
            id="ejerciciosInput"
            onChange={(e) => handleArchivoChange(e, 'ejercicios')}
            accept=".pdf,.doc,.docx"
            required
          />
        </label>
        {error && <p>{error}</p>}
      </section>
      <section>
        <h2>Ejercicios obligatorios</h2>
        <label htmlFor="ejerciciosObligatoriosInput">
          <img src="ruta-a-tu-imagen" alt="Ejercicios obligatorios" />
          <input
            type="file"
            id="ejerciciosObligatoriosInput"
            onChange={(e) => handleArchivoChange(e, 'ejercicios_obligatorios')}
            accept=".pdf,.doc,.docx"
            required
          />
        </label>
        {error && <p>{error}</p>}
      </section>
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
