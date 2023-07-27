import axios from 'axios';
import { setCourses } from '../reducers/cursosReducer'; // Asegúrate de importar la acción desde el archivo del slice

// Action Types
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';

export const fetchCourse = (cursoId) => {
  return (dispatch) => {
    axios.get(`https://backend-sga.onrender.com/cursos/${cursoId}`)
      .then((response) => {
        const course = response.data;
        dispatch(setCourses(course)); // Utilizamos la acción del slice para actualizar el estado
        // Redirect to the desired endpoint here
        // Use the information from the course to determine the endpoint
        // You can use the `useNavigate` hook or any other navigation method here
      })
      .catch((error) => {
        console.error('Error fetching course:', error);
      });
  };
};
