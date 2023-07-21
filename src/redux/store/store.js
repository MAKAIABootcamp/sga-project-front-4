import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import thunk from 'redux-thunk';
import eventsReducer from "../reducers/eventsReducer";
import adminRegisterReducer from "../reducers/adminRegisterReducer";

const store = configureStore({
    reducer: {eventsReducer, adminRegisterReducer},
    middleware: [thunk],
});

export default store;
=======
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
>>>>>>> recursoseducativosfinal
