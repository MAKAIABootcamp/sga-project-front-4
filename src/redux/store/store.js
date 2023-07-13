import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import eventsReducer from "../reducers/eventsReducer";
import adminRegisterReducer from "../reducers/adminRegisterReducer";

const store = configureStore({
    reducer: {eventsReducer, adminRegisterReducer},
    middleware: [thunk],
});

export default store;