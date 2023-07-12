import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "../reducers/adminReducer";
import { eventsReducer } from "../reducers/eventsReducer";

const reducer = {
    eventos: eventsReducer,
};


const store = configureStore({
  reducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;