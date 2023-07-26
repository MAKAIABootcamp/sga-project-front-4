import axios from "axios";

const URL_BASE = "http://localhost:3000/";


const endpointEtapas = "etapas";
export const getEtapas = async () => {
    try {
        const { data } = await axios.get(`${URL_BASE}${endpointEtapas}`);
        // console.log(data)
        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}
