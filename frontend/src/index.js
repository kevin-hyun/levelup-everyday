import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./store/auth-context";
import { GoalContextProvider } from "./store/goal-context";
import axios from "axios";

axios.defaults.baseURL =
  "http://ec2-3-39-255-32.ap-northeast-2.compute.amazonaws.com:5000/api";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoalContextProvider>
        <App />
      </GoalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
