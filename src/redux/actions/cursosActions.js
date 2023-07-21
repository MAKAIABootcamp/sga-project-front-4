// cursoActions.js

import axios from 'axios';

// Action Types
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';

// Action Creators
export const fetchCourseSuccess = (course) => ({
  type: FETCH_COURSE_SUCCESS,
  payload: course,
});

// Thunk Action Creator
export const fetchCourse = (cursoId) => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/cursos/${cursoId}`)
      .then((response) => {
        const course = response.data;
        dispatch(fetchCourseSuccess(course));
        // Redirect to the desired endpoint here
        // Use the information from the course to determine the endpoint
        // You can use the `useNavigate` hook or any other navigation method here
      })
      .catch((error) => {
        console.error('Error fetching course:', error);
      });
  };
};
