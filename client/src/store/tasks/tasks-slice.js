import { createSlice } from "@reduxjs/toolkit";

import { getTasks, addTask, deleteTask, updateTask } from "./side-effects";
import { sortTasksByPriority } from "../../utils/arrayHelpers";

const initialState = {
  loading: true,
  processing: false,
  todoLoading: false,
  in_progressLoading: false,
  doneLoading: false,
  error: "",
  addError: "",
  updateError: "",
  todo: [],
  in_progress: [],
  done: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetErrors(state) {
      state.error = "";
      state.addError = "";
    },
    startTaskLoading(state, action) {
      const { taskType } = action.payload;
      state[`${taskType}Loading`] = true;
    },
    sortTasksByDateNewestFirst(state, action) {
      const { taskType } = action.payload;
      state[taskType] = state[taskType]?.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    },
    sortTasksByDateOldestFirst(state, action) {
      const { taskType } = action.payload;
      state[taskType] = state[taskType]?.sort(
        (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
      );
    },
    sortTasksByPriorityLowHigh(state, action) {
      const { taskType } = action.payload;
      state[taskType] = sortTasksByPriority(state[taskType], "LH");
    },
    sortTasksByPriorityHighLow(state, action) {
      const { taskType } = action.payload;
      state[taskType] = sortTasksByPriority(state[taskType], "HL");
    },
  },
  extraReducers: {
    [getTasks.pending]: (state) => {
      state.todo = [];
      state.in_progress = [];
      state.done = [];
      state.loading = true;
    },
    [getTasks.fulfilled]: (state, action) => {
      state.todo = action.payload?.todo;
      state.in_progress = action.payload?.in_progress;
      state.done = action.payload?.done;
      state.loading = false;
    },

    [addTask.pending]: (state) => {
      state.processing = true;
    },
    [addTask.fulfilled]: (state, action) => {
      const newTask = action.payload?.task;
      state[newTask?.type]?.unshift(newTask);
      state.processing = false;
    },
    [addTask.rejected]: (state, action) => {
      state.addError = action.payload?.error;
      state.processing = false;
    },

    [deleteTask.fulfilled]: (state, action) => {
      const { taskType, taskId: deletedTaskId } = action.payload;

      state[taskType] = state[taskType]?.filter(
        (task) => task._id !== deletedTaskId
      );
      state[`${taskType}Loading`] = false;
    },
    [deleteTask.rejected]: (state, action) => {
      const { error, taskType } = action.payload;
      state.error = error;
      state[`${taskType}Loading`] = false;
    },

    [updateTask.pending]: (state) => {
      state.updateError = "";
      state.processing = true;
    },
    [updateTask.fulfilled]: (state, action) => {
      const {
        task: { type: newTaskType },
        prevTaskType,
      } = action.payload;

      state[prevTaskType] = state[prevTaskType].filter(
        (task) => task._id !== action.payload?.task?._id
      );

      // put the task at the start of the array
      // (newTaskType === prevTaskType if the task type was not updated)
      state[newTaskType].unshift(action.payload?.task);
      state.processing = false;
    },
    [updateTask.rejected]: (state, action) => {
      state.updateError = action.payload?.error;
      state.processing = false;
    },
  },
});

const taskActions = tasksSlice.actions;

export { taskActions };
export default tasksSlice.reducer;
