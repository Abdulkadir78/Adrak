const { ensureAuthenticated } = require("../../middleware/auth");
const { ensureValidObjectId } = require("../../middleware/validation");
const {
  sendInvitation,
  removeCollaborator,
} = require("../../controllers/collaborators");

const collaboratorRoutes = (router) => {
  router.post(
    "/:projectId/collaborators/:userId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    ensureValidObjectId("user"),
    sendInvitation
  );

  router.delete(
    "/:projectId/collaborators/:userId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    ensureValidObjectId("user"),
    removeCollaborator
  );
};

module.exports = collaboratorRoutes;
