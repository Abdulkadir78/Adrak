const router = require("express").Router();

const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/tasks");
const notesRoutes = require("./routes/notes");
const collaboratorsRoutes = require("./routes/collaborators");

projectRoutes(router);
taskRoutes(router);
notesRoutes(router);
collaboratorsRoutes(router);

module.exports = router;
