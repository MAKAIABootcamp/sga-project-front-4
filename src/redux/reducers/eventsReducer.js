import { eventsTypes } from "../types/types";

const initialState = {
    eventos: [],
  };
  
  export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case eventsTypes.OBTENER_EVENTOS:
        return {
          ...state,
          eventos: action.payload,
        };
      case eventsTypes.AGREGAR_EVENTO:
        return {
          ...state,
          eventos: [...state.eventos, action.payload],
        };        
      default:
        return state;
    }
  };