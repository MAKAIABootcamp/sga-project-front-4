import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    estudiantes: [],
};

const studentSlice = createSlice({
    name: 'students',
    initialState,

    reducers: {
        setEstudiantes: (state, action) => {
            state.eventos = action.payload
        },
    }
});

export const {
    setEstudiantes
} = studentSlice.actions;
export default studentSlice.reducer;