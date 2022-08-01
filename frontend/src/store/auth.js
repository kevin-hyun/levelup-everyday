import { createSlice } from "@reduxjs/toolkit";

const loggedIn = localStorage.getItem("token") ? true : false;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";
const initialAuthState = {
  isAuthenticated: loggedIn,
  token: token,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload);
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
