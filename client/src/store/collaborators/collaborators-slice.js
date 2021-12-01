import { createSlice } from "@reduxjs/toolkit";

import { search, sendInvitation, removeCollaborator } from "./side-effects";

const initialState = {
  users: [],
  loading: false,
  message: "",
  error: "",
  searchError: "",
};

const collabSlice = createSlice({
  name: "collaborators",
  initialState,
  reducers: {
    reset(state) {
      state.error = "";
      state.searchError = "";
      state.message = "";
      state.users = [];
    },
    resetUsers(state) {
      state.users = [];
    },
  },
  extraReducers: {
    [search.pending]: (state) => {
      state.message = "";
      state.error = "";
      state.searchError = "";
      state.loading = true;
    },
    [search.fulfilled]: (state, action) => {
      state.users = action.payload?.users;
      state.loading = false;
    },
    [search.rejected]: (state, action) => {
      state.searchError = action.payload?.error;
      state.loading = false;
    },

    [sendInvitation.pending]: (state) => {
      state.error = "";
      state.loading = true;
    },
    [sendInvitation.fulfilled]: (state, action) => {
      state.message = action.payload?.message;
      state.loading = false;
    },
    [sendInvitation.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },

    [removeCollaborator.pending]: (state) => {
      state.error = "";
      state.loading = true;
    },
    [removeCollaborator.fulfilled]: (state, action) => {
      state.message = action.payload?.message;
      state.loading = false;
    },
    [removeCollaborator.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },
  },
});

const collabActions = collabSlice.actions;

export { collabActions };
export default collabSlice.reducer;
