// cursoReducer.js

import { FETCH_COURSE_SUCCESS } from '../types/types';

// Estado inicial del curso
const initialState = {
  curso: null,
};

const cursoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        curso: action.payload,
      };
    default:
      return state;
  }
};

export default cursoReducer;
