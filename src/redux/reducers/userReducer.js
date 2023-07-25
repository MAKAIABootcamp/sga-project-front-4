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
