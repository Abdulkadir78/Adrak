import { createSlice } from "@reduxjs/toolkit";

import { login, logout } from "../auth/side-effects";
import {
  getUserProfile,
  updateProfilePic,
  removeProfilePic,
  acceptCollabInvitation,
  removeCollabInvitation,
} from "./side-effects";

import { filterArray } from "../../utils/arrayHelpers";

const initialState = {
  user: null,
  loading: false,
  profilePicLoading: false,
  message: "",
  error: "",
  collabError: "",
  profilePicError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError(state) {
      state.error = "";
    },
    resetCollabError(state) {
      state.collabError = "";
    },
    resetProfilePicError(state) {
      state.profilePicError = "";
    },
    resetMessage(state) {
      state.message = "";
    },
  },

  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload?.user;
    },

    [logout.fulfilled]: () => initialState,

    [getUserProfile.pending]: (state) => {
      state.error = "";
      state.loading = true;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.user = action.payload?.user;
      state.loading = false;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },

    [updateProfilePic.pending]: (state) => {
      state.profilePicError = "";
      state.profilePicLoading = true;
    },
    [updateProfilePic.fulfilled]: (state, action) => {
      state.user.profile_url = action.payload?.url;
      state.profilePicLoading = false;
    },
    [updateProfilePic.rejected]: (state, action) => {
      state.profilePicError = action.payload?.error;
      state.profilePicLoading = false;
    },

    [removeProfilePic.pending]: (state) => {
      state.profilePicError = "";
      state.profilePicLoading = true;
    },
    [removeProfilePic.fulfilled]: (state, action) => {
      state.user.profile_url = "";
      state.profilePicLoading = false;
    },
    [removeProfilePic.rejected]: (state, action) => {
      state.profilePicError = action.payload?.error;
      state.profilePicLoading = false;
    },

    [acceptCollabInvitation.pending]: (state) => {
      state.collabError = "";
      state.loading = true;
    },
    [acceptCollabInvitation.fulfilled]: (state, action) => {
      const { message, invitationId } = action.payload;
      state.message = message;
      state.user.invitations = filterArray(
        state.user.invitations,
        "_id",
        invitationId
      );
      state.loading = false;
    },
    [acceptCollabInvitation.rejected]: (state, action) => {
      state.collabError = action.payload?.error;
      state.loading = false;
    },

    [removeCollabInvitation.pending]: (state) => {
      state.collabError = "";
      state.loading = true;
    },
    [removeCollabInvitation.fulfilled]: (state, action) => {
      state.user.invitations = state.user.invitations = filterArray(
        state.user.invitations,
        "_id",
        action.payload.invitationId
      );
      state.loading = false;
    },
    [removeCollabInvitation.rejected]: (state, action) => {
      state.collabError = action.payload?.error;
      state.loading = false;
    },
  },
});

const userActions = userSlice.actions;

export { userActions };
export default userSlice.reducer;
