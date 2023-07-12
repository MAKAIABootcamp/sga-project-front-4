import { adminTypes } from "../types/types";

const initialState = {
  administradores: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.OBTENER_ADMINISTRADORES:
      return {
        ...state,
        administradores: action.payload.administradores,
      };
    case adminTypes.AGREGAR_ADMINISTRADOR:
      return {
        ...state,
        administradores: [...state.administradores, action.payload],
      };
    default:
      return state;
  }
};
