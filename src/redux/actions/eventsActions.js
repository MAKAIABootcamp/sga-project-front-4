import axios from "axios";
import { setEventos } from "../reducers/eventsReducer";

const URL = 'https://backend-sga-icqb.vercel.app/';

export const listEvents = (endpoint) => {
  return async (dispatch) => {
    try {
      const eventos = await axios.get(`${URL}${endpoint}`);
      console.log(eventos.data);
      dispatch(setEventos(eventos.data));
    } catch (error) {
      console.log('error', error);
    }
  }
}
