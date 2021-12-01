import { createSlice } from "@reduxjs/toolkit";

import { getNotes, addNote, deleteNote, updateNote } from "./side-effects";

const initialState = {
  loading: true,
  fetchError: "",
  error: "",
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: {
    [getNotes.pending]: (state) => {
      state.loading = true;
    },
    [getNotes.fulfilled]: (state, action) => {
      state.notes = action.payload?.notes;
      state.loading = false;
    },
    [getNotes.rejected]: (state, action) => {
      state.fetchError = action.payload?.error;
      state.loading = false;
    },

    [addNote.pending]: (state) => {
      state.error = "";
      state.loading = true;
    },
    [addNote.fulfilled]: (state, action) => {
      state.notes.unshift(action.payload?.note);
      state.loading = false;
    },
    [addNote.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },

    [deleteNote.pending]: (state) => {
      state.loading = true;
    },
    [deleteNote.fulfilled]: (state, action) => {
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload?.noteId
      );
      state.loading = false;
    },
    [deleteNote.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },

    [updateNote.pending]: (state) => {
      state.loading = true;
    },
    [updateNote.fulfilled]: (state, action) => {
      let existingNoteIndex = state.notes.findIndex(
        (note) => note._id === action.payload?.note?._id
      );
      state.notes[existingNoteIndex] = action.payload.note;
      state.loading = false;
    },
    [updateNote.rejected]: (state, action) => {
      state.error = action.payload?.error;
      state.loading = false;
    },
  },
});

const notesActions = notesSlice.actions;

export { notesActions };
export default notesSlice.reducer;
