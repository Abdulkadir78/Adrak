const {
  findProjectByIdAndOwner,
  findProjectsByOwnerOrCollab,
  findProjectByIdAndOwnerOrCollab,
  separateTasksByType,
} = require("./helpers");

const asyncHandler = require("../utils/asyncHandler");
const Project = require("../db/models/Project");
const Task = require("../db/models/Task");
const Note = require("../db/models/Note");

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await findProjectsByOwnerOrCollab(req);
  res.json({ projects: projects.reverse(), success: true });
});

// @desc    Get a project by id
// @route   GET /api/projects/:projectId
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  await project.populate("collaborators");
  await project.populate("tasks");

  const tasks = separateTasksByType(project.tasks);

  const {
    _id,
    name,
    technologies,
    createdAt,
    updatedAt,
    collaborators,
    owner,
  } = project;

  const toSend = {
    _id,
    name,
    technologies,
    createdAt,
    updatedAt,
    collaborators,
    owner,
    tasks,
  };

  res.json({ project: toSend, success: true });
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const addProject = asyncHandler(async (req, res) => {
  const { technologies } = req.body;
  if (technologies && technologies.length > 5) {
    res.status(400);
    throw new Error("Only 5 technologies can be added");
  }

  const projectNameTaken = await Project.findOne({
    name: req.body.name,
    owner: req.user._id,
  });

  if (projectNameTaken) {
    res.status(409);
    throw new Error("Project name unavailable");
  }

  const project = new Project({ ...req.body, owner: req.user._id });
  await project.save();

  res
    .status(201)
    .json({ project, message: "Project created successfully", success: true });
});

// @desc    Delete a project
// @route   DELETE /api/projects/:projectId
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  // only the owner can delete the project
  const project = await findProjectByIdAndOwner(req, res);
  // Delete all tasks for that project
  await Task.deleteMany({
    _id: {
      $in: project.tasks,
    },
  });
  // Delete all notes for that project
  await Note.deleteMany({
    _id: {
      $in: project.notes,
    },
  });
  // delete project
  await project.remove();

  res.json({ message: "Project deleted successfully", success: true });
});

// @desc    Update a project
// @route   PATCH /api/projects/:projectId
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  // only the owner can update the project
  const project = await findProjectByIdAndOwner(req, res);

  if (Object.keys(req.body).length > 0) {
    // Can only update these fields
    const { name, description, technologies } = req.body;

    // if new name is passed, check if it is already in use
    if (name) {
      const projectNameTaken = await Project.findOne({
        name: req.body.name,
        owner: req.user._id,
      });

      if (
        projectNameTaken &&
        projectNameTaken._id.toString() !== req.params.projectId
      ) {
        res.status(409);
        throw new Error("Project name unavailable");
      }
    }

    /*  project.field = field ?? project.field 
    
        This statement means that if the field is not passed (will be undefined in this case)
        then use the previous one, and if it is passed then, 
        use the new one (will be validated by the schema) 
    */
    project.name = name ?? project.name;
    project.description = description ?? project.description;
    technologies &&
      Array.isArray(technologies) &&
      (project.technologies = technologies);

    await project.save();

    return res.json({
      project,
      message: "Project updated successfully",
      success: true,
    });
  }

  res.json({ project, success: true });
});

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
};
