import axios from "axios";
import { addEvento, setEventos } from "../reducers/eventsReducer";

const URL = "https://backend-sga-icqb.vercel.app/";

export const listEvents = (endpoint) => {
  return async (dispatch) => {
    try {
      const eventos = await axios.get(`${URL}${endpoint}`);
      //   console.log(eventos.data);
      dispatch(setEventos(eventos.data));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const addEvent = async (endpoint, evento) => {
  try {
    const { data } = await axios.post(`${URL}${endpoint}`, evento);
    console.log(data);
    dispatch(addEvento(data));
  } catch (error) {
    console.log(error);
  }
};
