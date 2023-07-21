import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    estudiantes: [],
};

const studentSlice = createSlice({
    name: 'estudiantes',
    initialState,

    reducers: {
        setEstudiantes: (state, action) => {
            state.estudiantes = action.payload
        },
        addEstudiantes: (state, action) => {
            state.estudiantes = [...state.estudiantes, action.payload];
        },
        deleteEstudiantes: (state, action) => {
            state.estudiantes = state.eventos.filter(
                (evento) => evento.id !== action.payload
              );
          },
    }
});

export const {
    setEstudiantes,
    addEstudiantes,
    deleteEstudiantes
} = studentSlice.actions;
export default studentSlice.reducer;