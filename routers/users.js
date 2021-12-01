const router = require("express").Router();

const userRoutes = require("./routes/user");

userRoutes(router);

module.exports = router;
