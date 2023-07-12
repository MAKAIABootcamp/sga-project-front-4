import axios from "axios";
import { adminTypes, eventsTypes } from "../types/types";

const URL_BASE = "https://backend-sga-icqb.vercel.app/";
const endpointEvents = "eventos";
const endpointAdmins = "administradores";

//FUNCIÓN PARA TRAER TODOS LOS EVENTOS

export const actionGetEventsAsync = () => {
  return async (dispatch) => {
    await axios
      .get(`${URL_BASE}${endpointEvents}`)
      .then((response) => {
        const eventos = response.data;
        dispatch(actionGetEventsSync(eventos));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const actionGetEventsSync = (eventos) => {
  return {
    type: eventsTypes.OBTENER_EVENTOS,
    payload: eventos,
  };
};

//FUNCIÓN PARA TRAER TODOS LOS ADMINISTRADORES

export const actionGetAdminsAsync = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_BASE}${endpointAdmins}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      dispatch(actionGetAdminsSync(data));
    }
  };
};

const actionGetAdminsSync = (data) => {
  return {
    type: adminTypes.OBTENER_ADMINISTRADORES,
    payload: {
      data: data,
    },
  };
};
