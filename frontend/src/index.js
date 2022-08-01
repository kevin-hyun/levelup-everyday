import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";


import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";

const localhost = "http://localhost";

axios.defaults.baseURL = `${localhost}:5000/api`;
axios.defaults.headers.common[
  "Access-Control-Allow-Origin"
] = `${localhost}:3000`;

// const awsDNS = "http://ec2-3-39-255-32.ap-northeast-2.compute.amazonaws.com";

// axios.defaults.baseURL = `${awsDNS}:5000/api`;
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = `${awsDNS}:3000`;


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
