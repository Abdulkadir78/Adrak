import { createSlice } from "@reduxjs/toolkit";

import { toggle } from "./side-effects";

const initialState = {
  isDark: JSON.parse(localStorage.getItem("darkMode")),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  extraReducers: {
    [toggle.fulfilled]: (state, actions) => {
      state.isDark = actions.payload?.isDark;
    },
  },
});

const themeActions = themeSlice.actions;

export { themeActions };
export default themeSlice.reducer;
