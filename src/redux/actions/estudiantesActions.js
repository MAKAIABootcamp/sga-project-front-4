import axios from "axios";
import { setEstudiantes } from "../reducers/estudiantesReducer";

const URL = 'https://backend-sga-icqb.vercel.app/';

export const getStudents = (endpoint) => {
  return async (dispatch) => {
    try {
      const estudiantes = await axios.get(`${URL}${endpoint}`);
      console.log(estudiantes.data);
      dispatch(setEstudiantes(estudiantes.data));
    } catch (error) {
      console.log('error', error);
    }
  }
}