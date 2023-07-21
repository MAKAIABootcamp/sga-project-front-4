import { collections } from "../../services/data";

const initialState = {
  user: null,
  role: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case collections.USUARIOS:
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.user?.tipo || null, // Almacenar el rol del usuario en el estado global
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
