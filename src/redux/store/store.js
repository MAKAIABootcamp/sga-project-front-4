import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import eventsReducer from "../reducers/eventsReducer";
import adminRegisterReducer from "../reducers/adminRegisterReducer";
import estudiantesReducer from "../reducers/estudiantesReducer";

const store = configureStore({
    reducer: {eventsReducer, adminRegisterReducer, estudiantesReducer},
    middleware: [thunk],
});

export default store;