import axios from "axios";
const URL_BASE = "https://backend-sga-icqb.vercel.app/";

const endpointEvents = "eventos";

export const getEvents = async () => {
    try {
        const { data } = await axios.get(`${URL_BASE}${endpointEvents}`);
        console.log(data)
        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}

getEvents()

export const addEvent = async (evento) => {
    try {
      const { data } = await axios.post(`${URL_BASE}${endpointEvents}`, evento);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };


  const getNextEventId = async () => {
    try {
      const response = await axios.get(`${URL_BASE}${endpointEvents}`);
      const eventos = response.data;
  
      // Encontrar el ID más alto entre los eventos actuales
      const maxId = eventos.reduce((max, evento) => {
        const eventId = parseInt(evento.id, 10);
        return eventId > max ? eventId : max;
      }, 0);
  
      // Incrementar el ID más alto en uno para asignar el nuevo ID
      const nextId = (maxId + 1).toString();
  
      return nextId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getNextEventId();