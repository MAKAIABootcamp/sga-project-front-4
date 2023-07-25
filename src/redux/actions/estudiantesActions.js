import axios from "axios";
import { setEstudiantes, addEstudiantes, deleteEstudiantes, setCohorte } from "../reducers/estudiantesReducer";


const URL = 'http://localhost:3000/';

export const getStudents = (endpoint) => {
  return async (dispatch) => {
    try {
      const estudiantes = await axios.get(`${URL}${endpoint}`);
      // console.log(estudiantes.data);
      dispatch(setEstudiantes(estudiantes.data));
    } catch (error) {
      console.log('error', error);
    }
  }
}

export const addStudents = (endpoint, estudiantes) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}${endpoint}`, estudiantes);
      console.log(data);
      dispatch(addEstudiantes(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteStudents =  (endpoint, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL}${endpoint}/${id}`);
      console.log(data);
      dispatch(deleteEstudiantes(id));
    } catch (error) {
      console.log(error);
    }
  };
};
export const filterCohorte = (cohorte) => {
  return async (dispatch) => {
    try {
      dispatch(setCohorte(cohorte));
    } catch (error) {
      console.log('error', error);
    }
  }
}