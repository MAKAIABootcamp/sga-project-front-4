import { combineReducers } from 'redux';
import { ACTUALIZAR_EVENTO_SELECCIONADO } from '../types/types';

const initialState = {
  eventoSeleccionado: null,
};

const eventoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZAR_EVENTO_SELECCIONADO:
      return {
        ...state,
        eventoSeleccionado: action.payload,
      };
    default:
      return state;
  }
};

const eventosReducer = (state = [], action) => {
  switch (action.type) {
    case 'AGREGAR_EVENTO':
      return [...state, action.payload];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
    eventos: eventosReducer,
    evento: eventoReducer,
  // Agrega más reducers aquí si es necesario
});

export default rootReducer;

