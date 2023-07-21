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
  console.log({ cursoId });

  const [modulo, setModulo] = useState('');
  const [tipoRecurso, setTipoRecurso] = useState('grabacion');
  const [enlaceGrabacion, setEnlaceGrabacion] = useState('');
  const [archivos, setArchivos] = useState({});
  const [error, setError] = useState('');
  const [serverResponse, setServerResponse] = useState([]);
  const [cursoActual, setCursoActual] = useState(null);
  const [parsedResponses, setParsedResponses] = useState([]);
  const [recursosTipoSeleccionado, setRecursosTipoSeleccionado] = useState([]); // Agregar estado para almacenar los recursos del tipo seleccionado
  const [recursosData, setRecursosData] = useState([]);
  useEffect(() => {
    setCursoActual(course.curso); 
   // Almacenamos la información del curso del estado 'course' en 'cursoActual'
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
  // Simulación del servidor como archivo JSON local
const serverData = {
  recursos: {
    grabacion: [],
    diapositivas: [],
    lectura: [],
    ejercicios: [],
    ejercicios_obligatorios: []
  }
};
// const handleSubmit = (e) => {
//   e.preventDefault();

 
//   const recursosSeleccionados = serverData.recursos[tipoRecurso]; 
//   Simulamos un nuevo recurso con los datos del formulario
//   const nuevoRecurso = {
//     modulo: modulo,
//     tipoRecurso: tipoRecurso,
//     enlaceGrabacion: enlaceGrabacion,
//     archivos: tipoRecurso !== 'grabacion' ? archivos[tipoRecurso] : {}
//   };
//  setRecursosTipoSeleccionado([...recursosSeleccionados, nuevoRecurso]);
//   Agregamos el nuevo recurso a la lista de recursos del tipo seleccionado
//   serverData.recursos[tipoRecurso] = recursosSeleccionados;
//   console.log(nuevoRecurso);

// console.log(nuevoRecurso);
//   Resto del código...
// };
const handleSubmit = (e,cursoIdObj) => {
  e.preventDefault();

  if (cursoActual) {
    // Get the base endpoint URL from cursoActual.endpointUrl
    const baseEndpoint = "http://localhost:3000/cursos"
    const { cursoId } = cursoIdObj;
    // Get the endpoint URL for the selected tipoRecurso
    const endpoint = `${baseEndpoint}/${tipoRecurso}/${cursoIdObj}`;
console.log(endpoint);
    // Simulate a new resource with the form data
    const nuevoRecurso = {
      modulo: modulo,
      tipoRecurso: tipoRecurso,
      enlaceGrabacion: tipoRecurso === 'grabacion' ? enlaceGrabacion : '',
      archivos: tipoRecurso !== 'grabacion' ? archivos[tipoRecurso] : {}
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

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     Realizar validación manual del formulario
//     if (tipoRecurso === 'diapositivas' && !archivos['diapositivas']) {
//       setError('Seleccione un archivo de diapositivas');
//       return;
//     }
//     if (!cursoActual.curso || !cursoActual.curso.recursosEndpoint) {
//       setError('Endpoint de recursos no definido para este curso.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('modulo', modulo);
//     formData.append('tipoRecurso', tipoRecurso);
//     formData.append('cursoId', cursoId);
//     formData.append('enlaceGrabacion', enlaceGrabacion);
// console.log(formData);
//     Agregar archivos al formData si el tipo de recurso es diferente de grabación
//     if (tipoRecurso !== 'grabacion') {
//       const archivo = archivos[tipoRecurso];
//       formData.append('archivo', archivo);
//     }

//     Realizar la solicitud POST usando formData para subir archivos
//     axios.post(cursoActual.curso.recursosEndpoint, formData)
//       .then((response) => {
//         setServerResponse((prevResponses) => [...prevResponses, response.data]);
//         setError(''); // Limpiar el mensaje de error si el envío del formulario es exitoso
//       })
//       .catch((error) => {
//         console.error(error);
//         setError('Error al enviar el formulario. Por favor, inténtelo de nuevo.'); // Establecer el mensaje de error en caso de que falle el envío del formulario
//       });
//   };

//   useEffect(() => {
//     const storedResponses = localStorage.getItem('serverResponse');
    
//     const parsedResponses = storedResponses ? JSON.parse(storedResponses) : [];
//     setServerResponse(parsedResponses);
//     console.log(JSON.parse(storedResponses))
//   }, []);
 
  if (!isDesktop) {
    return (
      <div className="inputs" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <form onSubmit={handleSubmit} className="division">
          <section className="inputs__titulo" id="inputs__titulo__responsive__mo" style={{ backgroundColor: "#B5B2B2", padding: "10px 20px", borderRadius: "5px" }}>
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
              onChange={handleEnlaceGrabacionChange} />
            </div>
          )}
          {tipoRecurso !== 'grabacion' && (
            <div className="inputs__input">
              <label htmlFor="archivo">Archivo:</label>
              <input type="file" id="archivo"
               onChange={(e) => handleArchivoChange(e, tipoRecurso)}
                accept=".pdf,.doc,.docx" />
              {error && <p>{error}</p>}
            </div>
          )}
          <section>
            <button type="submit" id='botonparasubirarchivo'>Subir Archivo</button>
          </section>
        </form>

        {/* <div className="card-container inputs__respuesta">
  {parsedResponses.length === 0 ? (
    <p>No hay respuestas disponibles.</p>
  ) : (
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
    ))
  )}
</div>
       */}
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
          </div>
        
        </section>

  <div>
    <h2>{`Recursos de tipo ${tipoRecurso}`}</h2>
    {recursosTipoSeleccionado.map((recurso, index) => (
      <div key={index}>
        <p>Modulo: {recurso.modulo}</p>
        <p>Tipo de Recurso: {recurso.tipoRecurso}</p>
        {recurso.tipoRecurso === 'grabacion' && (
          <p>Enlace de Grabación: {recurso.enlaceGrabacion}</p>
        )}
        {recurso.tipoRecurso !== 'grabacion' && recurso.archivos && (
          <div>
            {Object.entries(recurso.archivos).map(([tipo, archivo], i) => (
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


        {/* Resto del formulario */}
        <div className="inputs__input inputs__responsive" id="inputs__titulo__responsive__desktop">
          <label htmlFor="modulo">Módulo:</label>
          <input type="text" id="modulo" value={modulo} onChange={handleModuloChange} required />
        </div>
        <section>
          <button type="submit" id='botonparasubirarchivo'>Subir Archivo</button>
        </section>
      </form>
    
      {/* <div className="card-container inputs__respuesta">
  {parsedResponses.length === 0 ? (
    <p>No hay respuestas disponibles.</p>
  ) : (
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
    ))
  )}
</div> */}
    </div>
  );}
export default RecursosEducativos;  