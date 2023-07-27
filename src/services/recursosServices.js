// servicios.js
import axios from 'axios';

const URL = 'http://localhost:3000/';

export const obtenerRecursos = async (endpoint) => {
  try {
    const recursos = await axios.get(`${URL}${endpoint}`);
    return recursos.data;
  } catch (error) {
    throw new Error('Error al obtener los recursos');
  }
};

export const agregarRecurso = async (endpoint, recurso) => {
  try {
    const { data } = await axios.post(`${URL}${endpoint}`, recurso);
    return data;
  } catch (error) {
    throw new Error('Error al agregar el recurso');
  }
};

export const eliminarRecurso = async (endpoint, id) => {
  try {
    const { data } = await axios.delete(`${URL}${endpoint}/${id}`);
    return data;
  } catch (error) {
    throw new Error('Error al eliminar el recurso');
  }
};
