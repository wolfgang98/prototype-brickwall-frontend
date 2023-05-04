import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "@project/state";

import reportWebVitals from "./reportWebVitals";
import App from "./components/App";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { AppTheme } from "./theme";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={AppTheme}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
