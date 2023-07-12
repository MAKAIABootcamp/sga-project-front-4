import axios from 'axios';

const URL_API = 'https://backend-sga-icqb.vercel.app/administradores'

export const getAdmin= async () => {
    try{
        const { data } = await axios.get(`${URL_API}`)
        console.log(data)
        return data
    } catch (error){
        console.log(error)
        return [];
    }

}



export const addAdmin = async (adminData) => {
    try {
      const response = await axios.post(`${URL_API}`, adminData);
      return response.data;
    } catch (error) {
        console.log(error)
        return [];
    }
  };

  export const deleteAdmin = async (id) => {
    try {
      const response = await axios.delete(`${URL_API}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
 