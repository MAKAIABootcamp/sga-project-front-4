// import { collections } from "../../services/data";

// const initialState = {
//   user: null,
//   role: null,
//   error: null,
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case collections.USUARIOS:
//       return {
//         ...state,
//         user: action.payload.user,
//         role: action.payload.user?.tipo || null, // Almacenar el rol del usuario en el estado global
//         error: action.payload.error,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;


//---------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    editUser: (state, action) => {
      state.user = action.payload;
    },
    // deleteAdministrador: (state, action) => {
    //   state.eventos = state.eventos.filter(
    //     (evento) => evento.id !== action.payload
    //   );
    // },
  },
});

export const { loginUser, editUser} =
  userSlice.actions;
export default userSlice.reducer;