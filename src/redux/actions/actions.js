// acciones.js
import { ACTUALIZAR_EVENTOS, AGREGAR_EVENTO, ELIMINAR_EVENTO, ACTUALIZAR_EVENTO_SELECCIONADO  } from '../types/types';


export const actualizarEventoSeleccionado = (evento) => ({
  type: ACTUALIZAR_EVENTO_SELECCIONADO,
  payload: evento,
});

export const actualizarEventos = (nuevosEventos) => {
  return {
    type: ACTUALIZAR_EVENTOS,
    payload: nuevosEventos
  };
};

export const agregarEvento = (nuevoEvento) => {
  return {
    type: AGREGAR_EVENTO,
    payload: nuevoEvento
  };
};

export const eliminarEvento = (id) => {
  return {
    type: ELIMINAR_EVENTO,
    payload: id
  };
};

// ... otras acciones
