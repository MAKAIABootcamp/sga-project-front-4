import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter.jsx";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
