import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    administradores: [],
};

const administradorSlice = createSlice({
    name: 'administradores',
    initialState,

    reducers: {
        setAdministradores: (state, action) => {
            state.administradores = action.payload
        },
        addAdministrador: (state, action) => {
            state.administradores = [...state.administradores, action.payload];
        },
        deleteAdministrador: (state, action) => {
            state.administradores = [...state.administradores, action.payload];
          },
        
    }
});

export const {
    setAdministradores,
    addAdministrador,
    deleteAdministrador
} = administradorSlice.actions;
export default administradorSlice.reducer;