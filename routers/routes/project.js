const { ensureAuthenticated } = require("../../middleware/auth");
const { ensureValidObjectId } = require("../../middleware/validation");

const {
  getAllProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
} = require("../../controllers/projects");

const projectRoutes = (router) => {
  router.get("/", ensureAuthenticated, getAllProjects);

  router.get(
    "/:projectId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    getProjectById
  );

  router.post("/", ensureAuthenticated, addProject);

  router.delete(
    "/:projectId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    deleteProject
  );

  router.patch(
    "/:projectId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    updateProject
  );
};

module.exports = projectRoutes;
