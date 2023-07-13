import axios from "axios";

const API_FAKE = 'https://backend-sga-icqb.vercel.app/';

export const fuctionGet = async (endpoint) => {
    try {
        const {data} = await axios.get(`${API_FAKE}${endpoint}`);
        return data;
    } catch (error) {
        console.log('Error al realizar la peticion a la api', error);
        return [];
    }
}