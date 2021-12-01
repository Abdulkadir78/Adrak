import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  userProfile,
  updateUserProfilePic,
  removeUserProfilePic,
  acceptInvitation,
  removeInvitation,
} from "./api";

const getUserProfile = createAsyncThunk("user/profile", async (_, thunkAPI) => {
  const response = await userProfile();

  if (response.error) return thunkAPI.rejectWithValue(response);
  return response;
});

const updateProfilePic = createAsyncThunk(
  "user/profilePic",
  async (formData, thunkAPI) => {
    const file = formData?.get("profilePic");
    if (file?.size > 3 * 1024 * 1024) {
      return thunkAPI.rejectWithValue({
        error: "File too large. Maximum file size is 3MB.",
      });
    }

    const response = await updateUserProfilePic(formData);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const removeProfilePic = createAsyncThunk(
  "user/removeProfilePic",
  async (_, thunkAPI) => {
    const response = await removeUserProfilePic();

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const acceptCollabInvitation = createAsyncThunk(
  "user/acceptInvitation",
  async (invitationId, thunkAPI) => {
    const response = await acceptInvitation(invitationId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return { ...response, invitationId };
  }
);

const removeCollabInvitation = createAsyncThunk(
  "user/removeInvitation",
  async (invitationId, thunkAPI) => {
    const response = await removeInvitation(invitationId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return { ...response, invitationId };
  }
);

export {
  getUserProfile,
  updateProfilePic,
  removeProfilePic,
  acceptCollabInvitation,
  removeCollabInvitation,
};
