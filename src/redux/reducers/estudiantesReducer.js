import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    estudiantes: [],
    arrCohorte: [],
    
};

const studentSlice = createSlice({
    name: 'students',
    initialState,

    reducers: {
        setEstudiantes: (state, action) => {
            state.estudiantes = action.payload
        },
        setCohorte: (state, action) => {
            state.arrCohorte = action.payload
        }
    }
});

export const {
    setEstudiantes,
    setCohorte,
} = studentSlice.actions;
export default studentSlice.reducer;