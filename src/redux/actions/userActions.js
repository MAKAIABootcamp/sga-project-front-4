import { login } from "../../services/getUsers";
import { collections } from "../../services/data"

export const loginActionAsync = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await login(email, password);
      if (response) {
        dispatch(loginActionSync(response));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginActionSync = (user) => {
  return {
    type: collections.USUARIOS,
    payload: user,
  };
};