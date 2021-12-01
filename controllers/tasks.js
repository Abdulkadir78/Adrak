const {
  findProjectByIdAndOwnerOrCollab,
  searchForTaskInProject,
} = require("./helpers");

const { separateTasksByType } = require("./helpers/");
const asyncHandler = require("../utils/asyncHandler");
const Task = require("../db/models/Task");

// @desc    Get all tasks of a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
const getAllTasks = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  await project.populate("tasks");
  const tasks = separateTasksByType(project.tasks);

  res.json({ ...tasks, success: true });
});

// @desc    Get a task by id
// @route   GET /api/projects/:projectId/tasks/:taskId
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  const taskIndex = searchForTaskInProject(project, req, res);
  const taskId = project.tasks[taskIndex];

  const task = await Task.findById(taskId);

  res.json({ task, success: true });
});

// @desc    Add a task
// @route   POST /api/projects/:projectId/tasks
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  const task = new Task({ ...req.body, author: req.user._id });
  await task.save();

  project.tasks.push(task._id);
  await project.save();

  res.json({ task, message: "Task added successfully", success: true });
});

// @desc    Delete a task
// @route   DELETE /api/projects/:projectId/tasks/:taskId
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  const taskIndex = searchForTaskInProject(project, req, res);

  const [taskId] = project.tasks.splice(taskIndex, 1);
  await Task.findByIdAndRemove(taskId);
  await project.save();

  res.json({ message: "Task deleted successfully", success: true });
});

// @desc    Update a task
// @route   PATCH /api/projects/:projectId/tasks/:taskId
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwnerOrCollab(req, res);
  const taskIndex = searchForTaskInProject(project, req, res);
  const taskId = project.tasks[taskIndex];
  const task = await Task.findById(taskId);

  if (Object.keys(req.body).length > 0) {
    // Can only update these fields
    const { title, body, type, priority } = req.body;

    task.title = title ?? task.title;
    task.body = body ?? task.body;
    task.type = type ?? task.type;
    task.priority = priority ?? task.priority;

    await task.save();

    return res.json({
      task,
      message: "Task updated successfully",
      success: true,
    });
  }

  res.json({ task, success: true });
});

module.exports = { getAllTasks, getTaskById, addTask, deleteTask, updateTask };
