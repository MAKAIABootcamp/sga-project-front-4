import React, { useState } from 'react';
import axios from 'axios';

const RecursosEducativos = () => {
  const [file, setFile] = useState(null);
  const [modulo, setModulo] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleModuloChange = (e) => {
    setModulo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && modulo) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('modulo', modulo);

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
        <input type="file" onChange={handleFileChange} />
        <input type="text" value={modulo} onChange={handleModuloChange} placeholder="Nombre del módulo" />
        <button type="submit">Subir Archivo</button>
      </form>
    </div>
  );
};

export default RecursosEducativos;
