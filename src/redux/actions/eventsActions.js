import axios from "axios";
import { addEvento, deleteEvento, setEventos } from "../reducers/eventsReducer";

const URL = "http://localhost:3000/";

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

export const addEvent = (endpoint, evento) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}${endpoint}`, evento);
      console.log(data);
      dispatch(addEvento(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteEvent = (endpoint, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL}${endpoint}/${id}`);
      console.log(data);
      dispatch(deleteEvento(id));
    } catch (error) {
      console.log(error);
    }
  };
};
