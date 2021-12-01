import { createSlice } from "@reduxjs/toolkit";

import { login, logout, signup } from "./side-effects";

const initialState = {
  loading: false,
  authToken: "",
  error: "",
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.authToken = action.payload?.token;
    },
    resetError(state) {
      state.error = "";
    },
    resetMessage(state) {
      state.message = "";
    },
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.error = "";
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.authToken = action.payload?.token;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },

    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: () => initialState,
    [logout.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },

    [signup.pending]: (state) => {
      state.error = "";
      state.loading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.message = action.payload?.message;
      state.loading = false;
    },
    [signup.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },
  },
});

const authActions = authSlice.actions;

export { authActions };
export default authSlice.reducer;
