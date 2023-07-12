import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import eventsReducer from "../reducers/eventsReducer";

const store = configureStore({
    reducer: {eventsReducer},
    middleware: [thunk],
});

export default store;