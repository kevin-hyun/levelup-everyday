import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  goals: [],
};

const goalSlice = createSlice({
  name: "goalList",
  initialState: initialAuthState,
  reducers: {
    update(state, action) {
      state.goals = action.payload;
    },
    reset(state) {
      state.goals = [];
    },
    addItem(state, action) {
      state.goals.push(action.payload);
    },
  },
});

export const goalActions = goalSlice.actions;

export default goalSlice.reducer;
