import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  userProjects,
  addUserProject,
  deleteUserProject,
  updateUserProject,
  userProjectById,
} from "./api";

const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, thunkAPI) => {
    const response = await userProjects();

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const addProject = createAsyncThunk(
  "projects/addProject",
  async (project, thunkAPI) => {
    const response = await addUserProject(project);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, thunkAPI) => {
    const response = await deleteUserProject(projectId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return { ...response, projectId };
  }
);

const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, project }, thunkAPI) => {
    const response = await updateUserProject(projectId, project);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const getProjectById = createAsyncThunk(
  "projects/getProjectById",
  async (projectId, thunkAPI) => {
    const response = await userProjectById(projectId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
  getProjectById,
};
