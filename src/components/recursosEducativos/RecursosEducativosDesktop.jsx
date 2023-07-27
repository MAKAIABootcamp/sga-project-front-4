import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/recursos/RecursosDocentes.scss";
import iconDiapositivas from '../../assets/images/403227.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse } from '../../redux/actions/cursosActions';
import { useParams } from 'react-router-dom';
import { app } from '../../firebase/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';
import { getEtapas } from '../../services/getEtapas';

const RecursosEducativosDesktop = () => {
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

  const handleEtapaChange = (e) => {
    setEtapaSeleccionada(e.target.value);
    console.log(e.target.value);
  };


  const handleTipoArchivoChange = (tipoRecurso) => {
    setTipoRecurso(tipoRecurso);
    setEnlaceGrabacion('');
    setArchivos({});
    setError('');
  };
  const handleEnlaceGrabacionChange = (e) => {
    setEnlaceGrabacion(e.target.value);
  };
  const getEtapaNameById = (etapaId) => {
    const selectedEtapa = etapas.find((etapa) => etapa.id_etapa === etapaId);
    return selectedEtapa ? selectedEtapa.nombre : "";
  };
  

  const handleArchivoChange = (e, tipoRecurso) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2000000) {
      setArchivos({ ...archivos, [tipoRecurso]: selectedFile });
      setNombreRecurso(selectedFile.name)
      console.log(selectedFile.name);
      setError('');
      if (tipoRecurso !== 'enlaceGrabacion') {
        setTipoRecurso(tipoRecurso);
      }
    } else {
      setArchivos({ ...archivos, [tipoRecurso]: null });
      setError('El archivo debe ser en formato PDF o Word y tener un tamaño máximo de 2MB.');
    }
  };
  const getArchivosSubidosTipoSeleccionado = (tipoRecurso) => {
    return serverResponse.filter((recurso) => recurso.tipoRecurso === tipoRecurso);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (cursoActual) {
      const baseEndpoint = "https://backend-sga.onrender.com";
      const courseIdContenido = cursoActual.cursos.id_contenido;
      const endpoint = `${baseEndpoint}/${courseIdContenido}`;
      const etapaNombre = getEtapaNameById(etapaSeleccionada);
      console.log(etapaNombre);
      if (etapas.length === 0) {
        // If etapas data is not available yet, show an error message or handle it as needed
        setError("La lista de etapas aún se está cargando. Por favor, inténtelo de nuevo.");
        return;
      }
      const nuevoRecurso = {
        etapa: etapaNombre, // Set the "etapa" property using the etapaNombre variable
        tipoRecurso: tipoRecurso,
        enlaceGrabacion: tipoRecurso === "grabacion" ? enlaceGrabacion : "",
        nombreArchivo: nombreRecurso,
        url: "",
        ide: "",
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
                    setError('');
                    setArchivos({});
                    setEnlaceGrabacion('');
                    setNombreRecurso('');
            
                    // Show success alert
                    Swal.fire({
                      icon: 'success',
                      title: 'Buen trabajo!',
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
    <div className="inputs" style={{ borderRadius: "5px" }}>
      <section className="inputs__titulo" id='titulo__desktop' style={{ backgroundColor: "#B5B2B2", padding: "10px 20px", borderRadius: "5px" }}>
        <h1 >Material de estudio</h1>
      </section>
      <form onSubmit={handleSubmit} className="inputs__form__responsive">
        {/* Resto del formulario */}
  
        <div className="inputs__input inputs__responsive" id="inputs__titulo__responsive__desktop">
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
              onChange={(e) => handleArchivoChange(e, "diapositivas")}
              type="file"
              id="diapositivasInput"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }} // Oculta el input
            />
            {getArchivosSubidosTipoSeleccionado('diapositivas').map((recurso, index) => (
              <div key={index} className='inputs__respuesta'>
                <p>Agregado:{recurso.etapa}, {recurso.nombreArchivo}</p>
              
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
              onChange={(e) => handleArchivoChange(e, "lectura")}
            />
            
            {getArchivosSubidosTipoSeleccionado('lectura').map((recurso, index) => (
              <div key={index}  className='inputs__respuesta'>
                <p>Agregado:{recurso.etapa}, {recurso.nombreArchivo}</p>
         
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
              onChange={(e) => handleArchivoChange(e, "ejercicios")}
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
            {getArchivosSubidosTipoSeleccionado('ejercicios').map((recurso, index) => (
              <div key={index}  className='inputs__respuesta'>
                <p>Agregado:{recurso.etapa}, {recurso.nombreArchivo}</p>
              
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
              onChange={(e) => handleArchivoChange(e, "ejercicios_obligatorios")}
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
            {getArchivosSubidosTipoSeleccionado('ejercicios__obligatorios').map((recurso, index) => (
              <div key={index}  className='inputs__respuesta'>
                <p>Agregado:{recurso.etapa}, {recurso.nombreArchivo}</p>
             
              </div>
            ))}
          </div>
        </section>
        <label htmlFor="enlaceGrabacion">
  <h2>Enlace de Grabación</h2>
</label>
<input
  type="text"
  id="enlaceGrabacion"
  value={enlaceGrabacion}
  onChange={handleEnlaceGrabacionChange}
/>    
{tipoRecurso === 'grabacion' && (
  <div className='inputs__respuesta'>
    <p>
      Agregado: {etapaSeleccionada}
      <a href={enlaceGrabacion} target="_blank" rel="noopener noreferrer">
        <i className="fas fa-play-circle"></i> Enlace de grabación
      </a>
    </p>
  </div>
)}

        <section className='inputs__division'>
          <button type="submit" id='botonparasubirarchivo'>Subir Archivo</button>
        </section>
      </form>
    </div>
  );
};

export default RecursosEducativosDesktop;
