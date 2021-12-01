import { createAsyncThunk } from "@reduxjs/toolkit";

import { projectActions } from "../../projects/projects-slice";
import { taskActions } from "../tasks-slice";
import {
  projectTasks,
  addProjectTask,
  deleteProjectTask,
  updateProjectTask,
} from "./api";

const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (projectId, thunkAPI) => {
    const response = await projectTasks(projectId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ projectId, ...projectDetails }, thunkAPI) => {
    const response = await addProjectTask(projectId, projectDetails);

    if (response.error) return thunkAPI.rejectWithValue(response);

    thunkAPI.dispatch(projectActions.updateProjectWhenTaskAdded(response));
    return response;
  }
);

const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ projectId, taskId, taskType }, thunkAPI) => {
    thunkAPI.dispatch(taskActions.startTaskLoading({ taskType }));

    const response = await deleteProjectTask(projectId, taskId);
    if (response.error)
      return thunkAPI.rejectWithValue({ ...response, taskType });

    const responseToSend = { ...response, taskId, taskType };
    thunkAPI.dispatch(
      projectActions.updateProjectWhenTaskDeleted(responseToSend)
    );

    return responseToSend;
  }
);

const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ projectId, taskId, prevTaskType, ...taskDetails }, thunkAPI) => {
    const response = await updateProjectTask(projectId, taskId, taskDetails);

    if (response.error) return thunkAPI.rejectWithValue(response);

    const responseToSend = { ...response, prevTaskType };
    thunkAPI.dispatch(
      projectActions.updateProjectWhenTaskUpdated(responseToSend)
    );
    return responseToSend;
  }
);

export { getTasks, addTask, deleteTask, updateTask };
