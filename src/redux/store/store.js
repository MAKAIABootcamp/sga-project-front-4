import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import eventsReducer from "../reducers/eventsReducer";
import adminRegisterReducer from "../reducers/adminRegisterReducer";
import userReducer from "../reducers/userReducer";
import estudiantesReducer from "../reducers/estudiantesReducer";
import cursosReducer from "../reducers/cursosReducer";

const store = configureStore({
    reducer: {eventsReducer, adminRegisterReducer, userReducer, estudiantesReducer,cursosReducer},
    middleware: [thunk],
});

export default store;