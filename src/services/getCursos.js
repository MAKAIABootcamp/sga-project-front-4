import axios from "axios";

const URL_BASE = "https://backend-sga.onrender.com/";


const endpointEvents = "cursos";
export const getCursos = async () => {
    try {
        const { data } = await axios.get(`${URL_BASE}${endpointEvents}`);
        // console.log(data)
        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}