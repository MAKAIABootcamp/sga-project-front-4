import { collections } from "../../services/data";

const initialValues = {
  user: {},
  error: null,
};

const userReducer = (state = initialValues, action) => {
  switch (action.type) {
    case collections.USUARIOS:
      return {
        ...state,
        user: {
          ...action.payload.user,
        },
        error: action.payload.error,
      };

    default:
      return {
        ...state,
      };
  }
};
export default userReducer;
