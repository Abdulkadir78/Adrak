const Project = require("../../db/models/Project");
const User = require("../../db/models/User");

const findUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return user;
};

// Find a project by id which the user owns
const findProjectByIdAndOwner = async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.projectId,
    owner: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  return project;
};

// Find projects which either the user owns or is a collaborator
const findProjectsByOwnerOrCollab = async (req) => {
  const projects = await Project.find({
    $or: [{ owner: req.user._id }, { collaborators: req.user._id }],
  }).populate("tasks");

  return projects;
};

// Find a project by id which either the user owns or is a collaborator
const findProjectByIdAndOwnerOrCollab = async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.projectId,
    $or: [{ owner: req.user._id }, { collaborators: req.user._id }],
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  return project;
};

// Check if a task is present in a project's tasks array
const searchForTaskInProject = (project, req, res) => {
  const taskIndex = project.tasks.findIndex(
    (taskId) => taskId.toString() === req.params.taskId
  );

  if (taskIndex < 0) {
    res.status(404);
    throw new Error("Task not found");
  }

  return taskIndex;
};

// Check if a note is present in a project's notes array
const searchForNoteInProject = (project, req, res) => {
  const noteIndex = project.notes.findIndex(
    (noteId) => noteId.toString() === req.params.noteId
  );

  if (noteIndex < 0) {
    res.status(404);
    throw new Error("Note not found");
  }

  return noteIndex;
};

// Check if an invitation is present in a user's invitations array
const searchForInvitation = (req, res) => {
  const inviteIndex = req.user.invitations.findIndex(
    (invite) => invite._id.toString() === req.params.invitationId
  );

  if (inviteIndex < 0) {
    res.status(404);
    throw new Error("Could not find the invitation");
  }

  return inviteIndex;
};

const separateTasksByType = (tasks) => {
  const tasksResponseLayout = {
    todo: [],
    in_progress: [],
    done: [],
  };

  tasks.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

  const reducedTasks = tasks.reduce((acc, task) => {
    acc[task.type].unshift(task);
    return acc;
  }, (acc = tasksResponseLayout));

  return reducedTasks;
};

module.exports = {
  findUserById,
  findProjectsByOwnerOrCollab,
  findProjectByIdAndOwnerOrCollab,
  findProjectByIdAndOwner,
  searchForTaskInProject,
  searchForNoteInProject,
  searchForInvitation,
  separateTasksByType,
};
