const {
  getAllNotes,
  getNoteById,
  addNote,
  deleteNote,
  updateNote,
} = require("../../controllers/notes");

const { ensureAuthenticated } = require("../../middleware/auth");
const { ensureValidObjectId } = require("../../middleware/validation");

const notesRoutes = (router) => {
  router.get(
    "/:projectId/notes",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    getAllNotes
  );

  router.get(
    "/:projectId/notes/:noteId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    ensureValidObjectId("note"),
    getNoteById
  );

  router.post(
    "/:projectId/notes",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    addNote
  );

  router.delete(
    "/:projectId/notes/:noteId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    ensureValidObjectId("note"),
    deleteNote
  );

  router.patch(
    "/:projectId/notes/:noteId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    ensureValidObjectId("note"),
    updateNote
  );
};

module.exports = notesRoutes;
