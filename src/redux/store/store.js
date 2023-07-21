import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../reducers/eventsReducer";
import adminRegisterReducer from "../reducers/adminRegisterReducer";
import cursoReducer from "../reducers/cursosReducer";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    adminRegister: adminRegisterReducer,
    curso: cursoReducer,
  },
});

export default store;
