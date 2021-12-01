import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  projectNotes,
  addProjectNote,
  deleteProjectNote,
  updateProjectNote,
} from "./api";

const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (projectId, thunkAPI) => {
    const response = await projectNotes(projectId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ projectId, ...noteDetails }, thunkAPI) => {
    const response = await addProjectNote(projectId, noteDetails);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async ({ projectId, noteId }, thunkAPI) => {
    const response = await deleteProjectNote(projectId, noteId);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return { ...response, noteId };
  }
);

const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ projectId, noteId, ...noteDetails }, thunkAPI) => {
    const response = await updateProjectNote(projectId, noteId, noteDetails);

    if (response.error) return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export { getNotes, addNote, deleteNote, updateNote };
