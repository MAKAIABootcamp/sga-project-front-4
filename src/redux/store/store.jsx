import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/reducer";

const store = configureStore({
  reducer: rootReducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
