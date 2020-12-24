import Amplify from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import config from "./aws-exports";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import reducer from "./store/reducer";
import initialState from "./store/state";
import { StateProvider } from "./store/stateProvider";

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
