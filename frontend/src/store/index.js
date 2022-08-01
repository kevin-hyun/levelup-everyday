import { configureStore } from "@reduxjs/toolkit";

// import goalReducer from "./goal";
import authReducer from "./auth";
import goalReducer from "./goal";

const store = configureStore({
  reducer: { auth: authReducer, goal: goalReducer },
});

export default store;
