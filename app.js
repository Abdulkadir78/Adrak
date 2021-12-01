const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: "./config/dev.env" });

const { notFound, errorHandler } = require("./middleware/errors");
const connectToDb = require("./db/connection");
const userRouter = require("./routers/users");
const projectRouter = require("./routers/projects");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
connectToDb(app);

app.on("ready", () => {
  app.use("/api/users", userRouter);
  app.use("/api/projects", projectRouter);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "client", "build")));

    app.get("/*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("Server is up and running...");
    });
  }

  // handle errors
  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
});
