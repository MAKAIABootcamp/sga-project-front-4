import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    eventos: [],
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,

    reducers: {
        setEventos: (state, action) => {
            state.eventos = action.payload
        },
        addEvento: (state, action) => {
            state.eventos = [...state.eventos, action.payload];
          },
    }
});

export const {
    setEventos,
    addEvento
} = eventsSlice.actions;
export default eventsSlice.reducer;