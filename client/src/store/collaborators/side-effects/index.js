import { createAsyncThunk } from "@reduxjs/toolkit";

import { searchUsers, sendCollabInvitation, removeCollab } from "./api";

const search = createAsyncThunk(
  "collaborators/search",
  async (username, thunkAPI) => {
    const response = await searchUsers(username);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const sendInvitation = createAsyncThunk(
  "collaborators/sendInvitation",
  async ({ projectId, userId }, thunkAPI) => {
    const response = await sendCollabInvitation(projectId, userId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const removeCollaborator = createAsyncThunk(
  "collaborators/removeCollaborator",
  async ({ projectId, userId }, thunkAPI) => {
    const response = await removeCollab(projectId, userId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return { ...response, userId };
  }
);

export { search, sendInvitation, removeCollaborator };
