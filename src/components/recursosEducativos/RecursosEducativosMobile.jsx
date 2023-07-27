import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/recursos/RecursosDocentes.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse } from '../../redux/actions/cursosActions';
import { useParams } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { app } from '../../firebase/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';
import { getEtapas } from '../../services/getEtapas';

const RecursosEducativosMobile = () => {
  const storage = getStorage(app);
  const dispatch = useDispatch();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
  const course = useSelector((store) =>  store.cursosReducer);
  const { cursoId } = useParams();
  const [etapas, setEtapas] = useState([]);
  const [etapaSeleccionada, setEtapaSeleccionada] = useState('');  
  const [tipoRecurso, setTipoRecurso] = useState('grabacion');
  const [enlaceGrabacion, setEnlaceGrabacion] = useState('');
  const [archivos, setArchivos] = useState({});
  const [error, setError] = useState('');
  const [serverResponse, setServerResponse] = useState([]);
  const [cursoActual, setCursoActual] = useState(null);
  const [nombreRecurso, setNombreRecurso] = useState(''); 
  const [selectedResourceId, setSelectedResourceId] = useState(null);

  
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {

    setCursoActual(course); 
    dispatch(fetchCourse(cursoId));
  }, [dispatch, cursoId, course]);

  useEffect(() => {
    getEtapas().then((etapas) => {
      setEtapas(etapas);
      console.log(etapas);
    });
  }, []);

  // Resto del código...

  const handleEtapaChange = (e) => {
    setEtapaSeleccionada(e.target.value);
  };

  const handleTipoRecursoChange = (e) => {
    const selectedTipoRecurso = e.target.value;
    setTipoRecurso(selectedTipoRecurso);
    setEnlaceGrabacion('');
    setNombreRecurso(selectedTipoRecurso);
    setError('');
  };

  const handleEnlaceGrabacionChange = (e) => {
    setEnlaceGrabacion(e.target.value);
  };

  const handleArchivoChange = (e, tipoRecurso) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2000000) {
      setArchivos({ ...archivos, [tipoRecurso]: selectedFile });
      setError('');
    } else {
      setArchivos({ ...archivos, [tipoRecurso]: null });
      setError('El archivo debe ser en formato PDF o Word y tener un tamaño máximo de 2MB.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (cursoActual) {
      const baseEndpoint = "https://backend-sga.onrender.com";
      const courseIdContenido = cursoActual.cursos.id_contenido;
      const endpoint = `${baseEndpoint}/${courseIdContenido}`;
  
      const nuevoRecurso = {
        etapa: etapaSeleccionada,
        tipoRecurso: tipoRecurso,
        enlaceGrabacion: tipoRecurso === 'grabacion' ? enlaceGrabacion : '',
        nombreArchivo: nombreRecurso,
        url: "",
        ide:""
      };
      if (archivos[tipoRecurso]) {
        nuevoRecurso.archivo = archivos[tipoRecurso];
      }
  
      if (tipoRecurso !== 'grabacion' && archivos[tipoRecurso]) {
        const storageRef = ref(storage, `${courseIdContenido}`);
        uploadBytes(storageRef, nuevoRecurso.archivo)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                nuevoRecurso.url = url;
                axios
                  .post(endpoint, nuevoRecurso)
                  .then((response) => {
                    setServerResponse((prevResponses) => [...prevResponses, response.data]);
                    setArchivos({});
                    setEnlaceGrabacion('');
                    setNombreRecurso('');
                    setSelectedResourceId(null);
                    setError('');
                    // Show success alert
                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: 'Archivo cargado exitosamente!',
                    });
                  }) 
                  .catch((error) => {
                    console.error(error);
                    setError('Error al enviar el formulario. Por favor, inténtelo de nuevo.');
                    // Show error alert
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Error al enviar el formulario. Por favor, inténtelo de nuevo.',
                    });
                  });
              })
              .catch((error) => {
                console.error(error);
                setError("Error al obtener el enlace de descarga.");
                // Show error alert
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error al obtener el enlace de descarga.',
                });
              });
          })
          .catch((error) => {
            console.error(error);
            setError("Error al subir el archivo a Firebase Storage.");
            // Show error alert
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al subir el archivo a Firebase Storage.',
            });
          });
      } else {
        axios
          .post(endpoint, nuevoRecurso)
          .then((response) => {
            const newResourceId = response.data.id;
            nuevoRecurso.ide = newResourceId;
            console.log(newResourceId);
            setServerResponse((prevResponses) => [...prevResponses, response.data]);
            setError('');
            // Show success alert
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Archivo subido con éxito',
            });
          })
          .catch((error) => {
            console.error(error);
            setError('Error al enviar el formulario. Por favor, inténtelo de nuevo.');
            // Show error alert
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al enviar el formulario. Por favor, inténtelo de nuevo.',
            });
          });
      }
    } else {
      setError('El curso no tiene recursos disponibles.');
    }
  };


  return (
    <div className="inputs" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <form onSubmit={handleSubmit} className="division">
        <section className="inputs__titulo" id="inputs__titulo__responsive__mo" style={{ backgroundColor: "#B5B2B2", padding: "10px 20px", borderRadius: "5px" }}>
          <h1>Material de estudio</h1>
        </section>
        <div className="inputs__input">
          <label htmlFor="etapa">Etapa</label>
          <select id="etapa" value={etapaSeleccionada} onChange={handleEtapaChange} required>
            <option value="">Selecciona una etapa</option>
            {etapas.map((etapa) => (
              <option key={etapa.id_etapa} value={etapa.id_etapa}>
                {etapa.nombre}
              </option>
            ))}
          </select>
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
                Agregado: {recurso.etapa}
                <a href={recurso.enlaceGrabacion} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-play-circle"></i> Enlace de grabación
                </a>
              </p>
            ) : (
              <>
                <p>Agregado: {recurso.etapa}, {recurso.nombreArchivo}</p>
                {selectedResourceId === recurso.ide && (
                  <FaTrashAlt onClick={() => handleDeleteRecurso(recurso.ide)} />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecursosEducativosMobile;
