import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import eventsReducer from "../reducers/eventsReducer";
import adminRegisterReducer from "../reducers/adminRegisterReducer";
import userReducer from "../reducers/userReducer";
import estudiantesReducer from "../reducers/estudiantesReducer";

const store = configureStore({
    reducer: {eventsReducer, adminRegisterReducer, userReducer, estudiantesReducer},
    middleware: [thunk],
});

export default store;