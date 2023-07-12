import React, { useState } from 'react';
import axios from 'axios';

const RecursosEducativos = () => {
  const [file, setFile] = useState(null);
  const [modulo, setModulo] = useState('');
  const [tipoRecurso, setTipoRecurso] = useState('grabacion');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2000000) { // Limite de tamaño de archivo: 2MB
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('El archivo debe ser en formato PDF o Word y tener un tamaño máximo de 2MB.');
    }
  };

  const handleModuloChange = (e) => {
    setModulo(e.target.value);
  };

  const handleTipoRecursoChange = (e) => {
    setTipoRecurso(e.target.value);
    setFile(null);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipoRecurso === 'grabacion') {
      // Lógica para manejar la grabación de clase (por ejemplo, enviar el enlace a través de una solicitud POST)
      // Aquí puedes realizar la lógica adicional que necesites
      console.log('Enlace de grabación:', file);
    } else if (file && modulo) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('modulo', modulo);
      formData.append('tipoRecurso', tipoRecurso);

      axios.post('/api/upload', formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>Recursos Educativos</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
        <div>
          <label htmlFor="modulo">Módulo:</label>
          <input type="text" id="modulo" value={modulo} onChange={handleModuloChange} required />
        </div>
        <div>
          <label htmlFor="tipoRecurso">Tipo de Recurso:</label>
          <select id="tipoRecurso" value={tipoRecurso} onChange={handleTipoRecursoChange}>
            <option value="grabacion">Grabación de Clase</option>
            <option value="diapositivas">Diapositivas de Clase</option>
            <option value="lectura">Material de Lectura</option>
            <option value="ejercicios">Ejercicios</option>
            <option value="ejercicios_obligatorios">Ejercicios Obligatorios</option>
          </select>
        </div>
        {tipoRecurso !== 'grabacion' && (
          <div>
            <label htmlFor="archivo">Archivo:</label>
            <input type="file" id="archivo" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
            {error && <p>{error}</p>}
          </div>
        )}
        {tipoRecurso === 'grabacion' && (
          <div>
            <label htmlFor="enlaceGrabacion">Enlace de Grabación:</label>
            <input type="text" id="enlaceGrabacion" onChange={handleFileChange} required />
          </div>
        )}
        <button type="submit">Subir Archivo</button>
      </form>
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
