import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@material-ui/core';
import "../../styles/recursos/RecursosDocentes.scss";
import iconDiapositivas from '../../assets/images/403227.png';



const RecursosEducativos = ({ tituloCurso, endpointURL }) => {
  const isDesktop = useMediaQuery('(min-width: 769px)');

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
    const selectedTipoRecurso = e.target.value;
    setTipoRecurso(selectedTipoRecurso);
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
  const handleTipoArchivoChange = (tipoRecurso) => {
    setTipoRecurso(tipoRecurso);
    setEnlaceGrabacion('');
    setArchivos({});
    setError('');
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
        console.log(response.data); // Accede al valor actualizado aquí
        localStorage.setItem('serverResponse', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });}
 
  useEffect(()=> { const storedResponses = localStorage.getItem('serverResponse');
  const parsedResponses = storedResponses ? JSON.parse(storedResponses) : [];
  console.log(JSON.parse(storedResponses));

  })
 
  if (!isDesktop) {
    return (
      <div className="inputs" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <form onSubmit={handleSubmit} className="division">
          <section className="inputs__titulo" id="inputs__titulo__responsive" style={{ backgroundColor: "#B5B2B2", padding: "10px 20px", borderRadius: "5px" }}>
            <h1 >Material de estudio</h1>
          </section>
          <div className="inputs__input">
            <label htmlFor="modulo">Módulo:</label>
            <input type="text" id="modulo" value={modulo} onChange={handleModuloChange} required />
          </div>
          <div className="inputs__input">
            <label htmlFor="tipoRecurso">Tipo de Recurso:</label>
            <select value={tipoRecurso} onChange={handleTipoRecursoChange} id="mySelect">
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
              <input type="text" id="enlaceGrabacion" value={enlaceGrabacion} 
              onChange={handleEnlaceGrabacionChange} required />
            </div>
          )}
          {tipoRecurso !== 'grabacion' && (
            <div className="inputs__input">
              <label htmlFor="archivo">Archivo:</label>
              <input type="file" id="archivo"
               onChange={(e) => handleArchivoChange(e, tipoRecurso)}
                accept=".pdf,.doc,.docx" required />
              {error && <p>{error}</p>}
            </div>
          )}
          <section>
            <button type="submit" id='botonparasubirarchivo'>Subir Archivo</button>
          </section>
        </form>

        <div className="card-container inputs__respuesta">
          {
            parsedResponses.map((response, index) => (
              <div className="card" key={index}>
                <h3>Respuesta {index + 1}</h3>
                <p>Modulo: {response.modulo}</p>
                <p>Tipo de Recurso: {response.tipoRecurso}</p>
                {response.tipoRecurso === 'grabacion' && (
                  <div>
                    <p>Enlace de Grabación: {response.enlaceGrabacion}</p>
                  </div>
                )}
                {response.tipoRecurso !== 'grabacion' && response.archivos && (
                  <div>
                    {Object.entries(response.archivos).map(([tipo, archivo], i) => (
                      <div key={i}>
                        <p>{tipo}: </p>
                        {archivo && (
                          <a href={URL.createObjectURL(archivo)} target="_blank" rel="noopener noreferrer">
                            Ver archivo
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }

return (
  <div className="inputs" style={{ padding: "10px 122px", borderRadius: "5px" }}>
    <section className="inputs__titulo" style={{ backgroundColor: "#B5B2B2", padding: "10px 20px", borderRadius: "5px" }}>
      <h1 id=''>Material de estudio</h1>
    </section>
    <form onSubmit={handleSubmit} className="inputs__form__responsive">
      {/* Resto del formulario */}

      <div className="inputs__input inputs__responsive">
        <label htmlFor="enlaceGrabacion">
          <h2>Enlace de Grabación</h2>
        </label>
        <input
          type="text"
          id="enlaceGrabacion"
          value={enlaceGrabacion}
          onChange={handleEnlaceGrabacionChange}
        />
      </div>
      <section className='inputs__division'>
        <div className="inputs__input inputs__responsive">
          <label htmlFor="diapositivasInput">
            <h2>Diapositivas de la clase</h2>
            <img src={iconDiapositivas} alt="Diapositivas" />
          </label>
          <input
           onClick={() => handleTipoArchivoChange('diapositivas')} 
            type="file"
            id="diapositivasInput"
         
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }} // Oculta el input
            required
          />
        </div>
        <div className="inputs__input inputs__responsive">
          <label htmlFor="archivoLectura">
            <h2>Material de Lectura</h2>
            <img src={iconDiapositivas} alt="Material de Lectura" />
          </label>
          <input
            type="file"
            id="archivoLectura"
            onClick={() => handleTipoArchivoChange('lectura')} 
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }} // Oculta el input
          />
        </div>
      </section>
      <section className='inputs__division'>
        <div className="inputs__input inputs__responsive">
          <label htmlFor="ejerciciosInput">
            <h2>Ejercicios</h2>
            <img src={iconDiapositivas} alt="Diapositivas" />
          </label>
          <input
            type="file"
            id="ejerciciosInput"
            onClick={() => handleTipoArchivoChange('ejercicios')} 
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
          />
        </div>
        <div className="inputs__input inputs__responsive">
          <label htmlFor="ejerciciosObligatoriosInput">
            <h2>Ejercicios Obligatorios</h2>
            <img src={iconDiapositivas} alt="Diapositivas" />
          </label>
          <input
            type="file"
            id="ejerciciosObligatoriosInput"
            onClick={() => handleTipoArchivoChange('ejercicios_obligatorios')} 
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
          />
        </div>
      </section>

      {/* Resto del formulario */}
      <div className="inputs__input">
        <label htmlFor="modulo">Módulo:</label>
        <input type="text" id="modulo" value={modulo} onChange={handleModuloChange} required />
      </div>
      <section>
        <button type="submit" id='botonparasubirarchivo'>Subir Archivo</button>
      </section>
    </form>
    <div className="card-container inputs__respuesta">
      {/* Respuestas */}
    </div>
  </div>
);
}


export default RecursosEducativos;