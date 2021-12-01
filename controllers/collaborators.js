const { findProjectByIdAndOwner, findUserById } = require("./helpers");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Send an invitation for collaboration
// @route   POST /api/projects/:projectId/collaborators/:userId
// @access  Private
const sendInvitation = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwner(req, res);
  const user = await findUserById(req, res);

  if (project.collaborators.includes(req.params.userId)) {
    res.status(400);
    throw new Error("Already a collaborator");
  }

  if (req.user._id.toString() === req.params.userId) {
    res.status(400);
    throw new Error("Cannot add yourself as a collaborator");
  }

  user.invitations.push({
    body: `${req.user.username} invited you to collaborate on a project: ${project.name}`,
    sender_id: req.user._id,
    project_id: project._id,
  });

  await user.save();

  res.json({ message: "Invitation sent successfully", success: true });
});

// @desc    Remove a collaborator
// @route   DELETE /api/projects/:projectId/collaborators/:userId
// @access  Private
const removeCollaborator = asyncHandler(async (req, res) => {
  const project = await findProjectByIdAndOwner(req, res);
  const user = await findUserById(req, res);

  if (!project.collaborators.includes(req.params.userId)) {
    res.status(400);
    throw new Error("Not a collaborator");
  }

  project.collaborators = project.collaborators.filter(
    (collab) => collab._id.toString() !== user._id.toString()
  );

  await project.save();

  res.json({ message: "Collaborator removed successfully", success: true });
});

module.exports = { sendInvitation, removeCollaborator };
