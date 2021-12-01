import { createSlice } from "@reduxjs/toolkit";

import {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
  getProjectById,
} from "./side-effects";

import { logout } from "../auth/side-effects";

import { removeCollaborator } from "../collaborators/side-effects";
import { filterArray } from "../../utils/arrayHelpers";

const initialState = {
  loading: true,
  error: "",
  projects: [],
  addError: "",
  updateError: "",
  project: null,
  projectError: "",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetErrors(state) {
      state.error = "";
      state.addError = "";
      state.updateError = "";
    },
    updateProjectWhenTaskAdded(state, action) {
      const newTask = action.payload?.task;
      state.project.tasks[newTask?.type]?.unshift(newTask);
    },
    updateProjectWhenTaskDeleted(state, action) {
      const { taskType, taskId: deletedTaskId } = action.payload;
      state.project.tasks[taskType] = state.project?.tasks[taskType]?.filter(
        (task) => task._id !== deletedTaskId
      );
    },
    updateProjectWhenTaskUpdated(state, action) {
      const {
        task: { type: newTaskType },
        prevTaskType,
      } = action.payload;

      state.project.tasks[prevTaskType] = state.project.tasks[
        prevTaskType
      ]?.filter((task) => task._id !== action.payload?.task?._id);

      state.project.tasks[newTaskType].unshift(action.payload?.task);
    },
  },
  extraReducers: {
    [logout.fulfilled]: () => initialState,

    [getProjects.pending]: (state) => {
      state.loading = true;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.projects = action.payload?.projects;
      state.loading = false;
    },
    [getProjects.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },

    [addProject.pending]: (state) => {
      state.addError = "";
      state.loading = true;
    },
    [addProject.fulfilled]: (state, action) => {
      state.projects.unshift(action.payload?.project);
      state.loading = false;
    },
    [addProject.rejected]: (state, action) => {
      state.addError = action.payload?.error;
      state.loading = false;
    },

    [deleteProject.pending]: (state) => {
      state.error = "";
      state.loading = true;
    },
    [deleteProject.fulfilled]: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload?.projectId
      );
      state.loading = false;
    },
    [deleteProject.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },

    [updateProject.pending]: (state) => {
      state.updateError = "";
      state.loading = true;
    },
    [updateProject.fulfilled]: (state, action) => {
      const projectIndex = state.projects.findIndex(
        (project) => project._id === action.payload?.project?._id
      );
      state.projects[projectIndex] = action.payload?.project;
      state.loading = false;
    },
    [updateProject.rejected]: (state, action) => {
      state.updateError = action.payload?.error;
      state.loading = false;
    },

    [getProjectById.pending]: (state) => {
      state.projectError = "";
    },
    [getProjectById.fulfilled]: (state, action) => {
      state.project = action.payload?.project;
    },
    [getProjectById.rejected]: (state, action) => {
      state.projectError = action.payload?.error;
    },

    [removeCollaborator.fulfilled]: (state, action) => {
      state.project.collaborators = filterArray(
        state.project.collaborators,
        "_id",
        action.payload?.userId
      );
    },
  },
});

const projectActions = projectsSlice.actions;

export { projectActions };
export default projectsSlice.reducer;
