import { login } from "../../services/getUsers";

export const loginActionAsync = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await login(email, password);
      if (response) {
        //Se dispara la accion sincrona
      }
    } catch (error) {
      console.log(error);
    }
  };
};
