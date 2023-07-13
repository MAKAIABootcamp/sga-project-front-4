import axios from "axios";
import { addAdministrador, deleteAdministrador, setAdministradores } from "../reducers/adminRegisterReducer";


const URL = 'http://localhost:3000/';

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

export const addAdmin = (endpoint, administradores) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(`${URL}${endpoint}`, administradores);
        console.log(data);
        dispatch(addAdministrador(data));
      } catch (error) {
        console.log(error);
      }
    }
}  
 

export const deleteAdmin = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}${id}`);
    console.log(data);
      dispatch(deleteAdministrador(data));
  } catch (error) {
    console.log(error);
  }
};