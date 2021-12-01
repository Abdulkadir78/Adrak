const {
  getAllTasks,
  getTaskById,
  addTask,
  deleteTask,
  updateTask,
} = require("../../controllers/tasks");

const { ensureAuthenticated } = require("../../middleware/auth");
const { ensureValidObjectId } = require("../../middleware/validation");

const taskRoutes = (router) => {
  router.get(
    "/:projectId/tasks",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    getAllTasks
  );

  router.get(
    "/:projectId/tasks/:taskId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    ensureValidObjectId("task"),
    getTaskById
  );

  router.post(
    "/:projectId/tasks",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    addTask
  );

  router.delete(
    "/:projectId/tasks/:taskId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    ensureValidObjectId("task"),
    deleteTask
  );

  router.patch(
    "/:projectId/tasks/:taskId",
    ensureAuthenticated,
    ensureValidObjectId("project"),
    ensureValidObjectId("task"),
    updateTask
  );
};

module.exports = taskRoutes;
