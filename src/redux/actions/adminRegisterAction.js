import axios from "axios";
import { addAdministrador, setAdministradores } from "../reducers/adminRegisterReducer";


const URL = 'https://backend-sga-icqb.vercel.app/';

export const listAdmin = (endpoint) => {
  return async (dispatch) => {
    try {
      const administradores = await axios.get(`${URL}${endpoint}`);
      console.log(administradores.data);
      dispatch(setAdministradores(administradores.data));
    } catch (error) {
      console.log('error', error);
    }
  }
}

export const addAdmin = (endpoint, administrador) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(`${URL}${endpoint}`, administrador);
        console.log(data);
        dispatch(addAdministrador(data));
      } catch (error) {
        console.log(error);
      }
    }
}  