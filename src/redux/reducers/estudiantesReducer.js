import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    estudiantes: [],
    arrCohorte: [],
    
};

const studentSlice = createSlice({
    name: 'estudiantes',
    initialState,

    reducers: {
        setEstudiantes: (state, action) => {
            state.estudiantes = action.payload
        },
        addEstudiantes: (state, action) => {
            state.arrCohorte = action.payload;
        },
        deleteEstudiantes: (state, action) => {
            state.estudiantes = state.eventos.filter(
                (evento) => evento.id !== action.payload
              );
          },
        setCohorte: (state, action) => {
            state.arrCohorte = action.payload
        }
    }
});

export const {
    setEstudiantes,
    addEstudiantes,
    deleteEstudiantes,
    setCohorte,
} = studentSlice.actions;
export default studentSlice.reducer;