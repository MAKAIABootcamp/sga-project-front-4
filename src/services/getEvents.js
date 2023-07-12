import axios from "axios";
const URL_BASE = "https://backend-sga-icqb.vercel.app/";

const endpointEvents = "eventos";

export const getEvents = async () => {
    try {
        const { data } = await axios.get(`${URL_BASE}${endpointEvents}`);
        // console.log(data)
        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}

getEvents()