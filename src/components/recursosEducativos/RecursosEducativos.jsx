import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@material-ui/core';
import "../../styles/recursos/RecursosDocentes.scss";
import iconDiapositivas from '../../assets/images/403227.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse } from '../../redux/actions/cursosActions';
import { useParams } from 'react-router-dom';

const RecursosEducativos = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const course = useSelector((state) => state.curso);
 const { cursoId } = useParams();

  const [modulo, setModulo] = useState('');
  const [tipoRecurso, setTipoRecurso] = useState('grabacion');
  const [enlaceGrabacion, setEnlaceGrabacion] = useState('');
  const [archivos, setArchivos] = useState({});
  const [error, setError] = useState('');
  const [serverResponse, setServerResponse] = useState([]);
  const [cursoActual, setCursoActual] = useState(null);
  const [recursosTipoSeleccionado, setRecursosTipoSeleccionado] = useState([]); // Agregar estado para almacenar los recursos del tipo seleccionado
const [nombreRecurso,setNombreRecurso]= useState(""); 
  useEffect(() => {
    setCursoActual(course.curso); 
    dispatch(fetchCourse(cursoId));

  }, [dispatch, cursoId, course]);

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
      setArchivos((prevState) => ({ ...prevState, [tipoRecurso]: selectedFile }));
      setError('');
      setNombreRecurso(selectedFile.name)
      
    } else {
      setArchivos((prevState) => ({ ...prevState, [tipoRecurso]: null }));
      setError('El archivo debe ser en formato PDF o Word y tener un tamaño máximo de 2MB.');
    }
  };

  const handleTipoArchivoChange = (tipoRecurso) => {
    setTipoRecurso(tipoRecurso);
    setEnlaceGrabacion('');
    setArchivos({});
    setError('');
  };

const handleSubmit = (e,idCurso) => {
  e.preventDefault();

  if (cursoActual) {
    // Get the base endpoint URL from cursoActual.endpointUrl
    const baseEndpoint = "http://localhost:3000"
    const courseIdContenido=course.curso.id_contenido 
    console.log(cursoId);
    const endpoint = `${baseEndpoint}/${courseIdContenido}`;
    console.log(endpoint);
    // Simulate a new resource with the form data
    const nuevoRecurso = {
      modulo: modulo,
      tipoRecurso: tipoRecurso,
      enlaceGrabacion: tipoRecurso === 'grabacion' ? enlaceGrabacion : '',
      archivos: tipoRecurso !== 'grabacion' ? archivos[tipoRecurso] : {},
      nombreArchivo:nombreRecurso
    };

    // Make the API call to the corresponding endpoint using axios
    axios
      .post(endpoint, nuevoRecurso)
      .then((response) => {
        // Handle the response from the server (if needed)
        console.log('Response from server:', response.data);
        setServerResponse((prevResponses) => [...prevResponses, response.data]);
        setError(''); // Clear the error message if the form submission is successful
      })
      .catch((error) => {
        console.error(error);
        setError('Error al enviar el formulario. Por favor, inténtelo de nuevo.'); // Set the error message in case the form submission fails
      });
  } else {
    setError('El curso no tiene recursos disponibles.');
  }
};
const getArchivosSubidosTipoSeleccionado = (tipoRecurso) => {
  return serverResponse.filter((recurso) => recurso.tipoRecurso === tipoRecurso);
};

if (!isDesktop) {
  return (
    <div className="inputs" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <form onSubmit={handleSubmit} className="division">
        <section className="inputs__titulo" id="inputs__titulo__responsive__mo" style={{ backgroundColor: "#B5B2B2", padding: "10px 20px", borderRadius: "5px" }}>
          <h1>Material de estudio</h1>
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
            <input type="text" id="enlaceGrabacion" value={enlaceGrabacion} onChange={handleEnlaceGrabacionChange} />
          </div>
        )}
        {tipoRecurso !== 'grabacion' && (
          <div className="inputs__input">
            <label htmlFor="archivo">Archivo:</label>
            <input type="file" id="archivo" onChange={(e) => handleArchivoChange(e, tipoRecurso)} accept=".pdf,.doc,.docx" />
            {error && <p>{error}</p>}
          </div>
        )}
        <section>
          <button type="submit" id='botonparasubirarchivo'>Subir Archivo</button>
        </section>
      </form>
      <div>
        {/* Mostrar todos los archivos subidos */}
        {serverResponse.map((recurso, index) => (
          <div key={index} className='inputs__respuesta'>
           {recurso.enlaceGrabacion ? (
      <p>
        Agregado: {recurso.modulo},
        <a href={recurso.enlaceGrabacion} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-play-circle"></i> Enlace de grabación
        </a>
      </p>
    ) : (
      <p>Agregado: {recurso.modulo}, {recurso.nombreArchivo}</p>
    )}
          </div>
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="inputs" style={{  borderRadius: "5px" }}>
               <section className="inputs__titulo" id='titulo__desktop' style={{ backgroundColor: "#B5B2B2", padding: "10px 20px", borderRadius: "5px" }}>
        <h1 >Material de estudio</h1>
      </section>
      <form onSubmit={handleSubmit} className="inputs__form__responsive">
        {/* Resto del formulario */}
  
        <div className="inputs__input inputs__responsive" id="inputs__titulo__responsive__desktop">
          <label htmlFor="enlaceGrabacion">
            <h2>Enlace de Grabación</h2>
          </label>
          <input
            type="text"
            id="enlaceGrabacion"
            value={enlaceGrabacion}
            onChange={handleEnlaceGrabacionChange}
          />
 {getArchivosSubidosTipoSeleccionado('grabacion').map((recurso, index) => (
  <div key={index} className='inputs__respuesta'>
    {recurso.enlaceGrabacion ? (
      <p>
        Agregado: {recurso.modulo},
        <a href={recurso.enlaceGrabacion} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-play-circle"></i> Enlace de grabación
        </a>
      </p>
    ) : (
      <p>Agregado: {recurso.modulo}, {recurso.nombreArchivo}</p>
    )}
  </div>
))}
        </div>
        <section className='inputs__division'>
          <div className="inputs__input inputs__responsive">
            <label htmlFor="diapositivasInput">
              <h2>Diapositivas de la clase</h2>
              <figure>
                <img src={iconDiapositivas} alt="Diapositivas" />
              </figure>
            </label>
            <input
              onClick={() => handleTipoArchivoChange('diapositivas')} 
              type="file"
              id="diapositivasInput"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }} // Oculta el input
            />
            {getArchivosSubidosTipoSeleccionado('diapositivas').map((recurso, index) => (
  <div key={index} className='inputs__respuesta'>
      <p>Agregado:{recurso.modulo}, {recurso.nombreArchivo}</p>
  </div>
))}

          </div>
         
          <div className="inputs__input inputs__responsive">
            <label htmlFor="archivoLectura">
              <h2>Material de Lectura</h2>
              <figure>
                <img src={iconDiapositivas} alt="Material de Lectura" />
              </figure>
            </label>
            <input
              type="file"
              id="archivoLectura"
              onClick={() => handleTipoArchivoChange('lectura')} 
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }} // Oculta el input
            />
              {getArchivosSubidosTipoSeleccionado('lectura').map((recurso, index) => (
  <div key={index}  className='inputs__respuesta'>
      <p>Agregado:{recurso.modulo}, {recurso.nombreArchivo}</p>
  </div>
))}
          </div>
        </section>
        <section className='inputs__division'>
          <div className="inputs__input inputs__responsive">
            <label htmlFor="ejerciciosInput">
              <h2>Ejercicios</h2>
              <figure>
                <img src={iconDiapositivas} alt="Diapositivas" />
              </figure>
            </label>
            <input
              type="file"
              id="ejerciciosInput"
              onClick={() => handleTipoArchivoChange('ejercicios')} 
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
                {getArchivosSubidosTipoSeleccionado('ejercicios').map((recurso, index) => (
  <div key={index}  className='inputs__respuesta'>
   <p>Agregado:{recurso.modulo}, {recurso.nombreArchivo}</p>
  </div>
))}
          </div>
          <div className="inputs__input inputs__responsive">
            <label htmlFor="ejerciciosObligatoriosInput">
              <h2>Ejercicios Obligatorios</h2>
              <figure>
                <img src={iconDiapositivas} alt="Diapositivas" />
              </figure>
            </label>
            <input
              type="file"
              id="ejerciciosObligatoriosInput"
              onClick={() => handleTipoArchivoChange('ejercicios_obligatorios')} 
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
                {getArchivosSubidosTipoSeleccionado('ejercicios__obligatorios').map((recurso, index) => (
  <div key={index}  className='inputs__respuesta'>
       <p>Agregado:{recurso.modulo}, {recurso.nombreArchivo}</p>
  </div>
))}
          </div>
        
        </section>
        <div className="inputs__input inputs__responsive" id="inputs__titulo__responsive__desktop">
          <label htmlFor="modulo">Módulo:</label>
          <input type="text" id="modulo" value={modulo} onChange={handleModuloChange} required />
        </div>
        <section>
          <button type="submit" id='botonparasubirarchivo'>Subir Archivo</button>
        </section>
      </form>                                                                                                                                                                                       
    </div>
  );}
export default RecursosEducativos;  