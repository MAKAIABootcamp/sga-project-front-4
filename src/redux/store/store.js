import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import eventsReducer from "../reducers/eventsReducer";
import adminRegisterReducer from "../reducers/adminRegisterReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
    reducer: {eventsReducer, adminRegisterReducer, userReducer},
    middleware: [thunk],
});

export default store;