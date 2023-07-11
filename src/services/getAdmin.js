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
getAdmin()

// export const createPost = async (postData) => {
//     try {
//       const response = await axios.post(`${URL_API}`, postData);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };