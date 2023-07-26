// recursosActions.js
import axios from 'axios';
import { setSelectedResourceId, addRecurso, removeRecurso } from '../reducers/recursosSlice';

const URL = 'http://localhost:3000/';

export const getRecursos = (endpoint) => {
  return async (dispatch) => {
    try {
      const recursos = await axios.get(`${URL}${endpoint}`);
      dispatch(setRecursos(recursos.data));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const addRecurso = (endpoint, recurso) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}${endpoint}`, recurso);
      dispatch(addRecurso(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteRecurso = (endpoint, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL}${endpoint}/${id}`);
      dispatch(removeRecurso(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterEtapa = (etapa) => {
  return async (dispatch) => {
    try {
      // Aquí puedes implementar la lógica para filtrar los recursos por etapa
      // Puedes utilizar el etapa como parámetro para la solicitud a la API
      // y luego actualizar el estado en Redux con los recursos filtrados
      // dispatch(setRecursos(recursosFiltrados));
    } catch (error) {
      console.log('error', error);
    }
  };
};
