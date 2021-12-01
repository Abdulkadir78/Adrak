const {
  findProjectByIdAndOwnerOrCollab,
  searchForNoteInProject,
} = require("./helpers");

const asyncHandler = require("../utils/asyncHandler");
const Note = require("../db/models/Note");

// @desc    Get all notes
// @route   GET /api/projects/:projectId/notes
// @access  Private
const getAllNotes = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  await project.populate("notes");

  res.json({ notes: project.notes, success: true });
});

// @desc    Get a note by id
// @route   GET /api/projects/:projectId/notes/:noteId
// @access  Private
const getNoteById = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  const noteIndex = searchForNoteInProject(project, req, res);
  const noteId = project.notes[noteIndex];

  const note = await Note.findById(noteId);

  res.json({ note, success: true });
});

// @desc    Add a note
// @route   POST /api/projects/:projectId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  if (!(req.body?.title?.trim() || req.body?.body?.trim())) {
    res.status(400);
    throw new Error("Note cannot be empty");
  }

  const note = new Note({ ...req.body, author: req.user._id });
  await note.save();

  project.notes.unshift(note._id);
  await project.save();

  res.json({ note, message: "Note added successfully", success: true });
});

// @desc    Delete a note
// @route   DELETE /api/projects/:projectId/notes/:noteId
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  const noteIndex = searchForNoteInProject(project, req, res);

  const [noteId] = project.notes.splice(noteIndex, 1);
  await Note.findByIdAndRemove(noteId);
  await project.save();

  res.json({ message: "Note deleted successfully", success: true });
});

// @desc    Update a note
// @route   PATCH /api/projects/:projectId/notes/:noteId
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);

  const noteIndex = searchForNoteInProject(project, req, res);
  const noteId = project.notes[noteIndex];
  const note = await Note.findById(noteId);

  if (Object.keys(req.body).length > 0) {
    note.title = req.body.title;
    note.body = req.body.body;
    await note.save();

    return res.json({
      note,
      message: "Note updated successfully",
      success: true,
    });
  }

  res.json({ note, success: true });
});

module.exports = { getAllNotes, getNoteById, addNote, deleteNote, updateNote };
