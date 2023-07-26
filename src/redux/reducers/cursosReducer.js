import { createSlice } from '@reduxjs/toolkit';

const initialCourses = {
cursos:[]
  
};

const courseSlice = createSlice({
  name: 'cursos',
  initialState: { cursos: initialCourses },
  reducers: {
    setCourses: (state, action) => {
      state.cursos = action.payload
  },
    // Add reducers here if needed, for example, if you want to add or update courses in the state
  },
});
export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;