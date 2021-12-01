const jwt = require("jsonwebtoken");

const { arePasswordsMatching } = require("../utils/validators");
const { searchForInvitation } = require("./helpers");
const {
  uploadImageToStorage,
  deleteImageFromStorage,
} = require("../utils/imageStorage");

const User = require("../db/models/User");
const Project = require("../db/models/Project");
const colors = require("../utils/constants/colors");
const asyncHandler = require("../utils/asyncHandler");
const randomPicker = require("../utils/randomPicker");

// @desc    Create a new user
// @route   POST /api/users/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { username, password, confirm_password } = req.body;

  if (!confirm_password) {
    res.status(400);
    throw new Error("Confirm password is required");
  }

  if (!arePasswordsMatching(password, confirm_password)) {
    res.status(400);
    throw new Error("Passwords don't match");
  }

  const existingUser = await User.findOne({
    username_lower: username.toLowerCase(),
  });

  if (existingUser) {
    res.status(409);
    throw new Error("Username is taken");
  }

  const user = new User({
    ...req.body,
    username_lower: req.body.username,
    profile_color: randomPicker(colors),
  });
  await user.save();

  res.json({ message: "Signup successful", success: true });
});

// @desc    Login and generate a token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required to login");
  }

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.isPasswordCorrect(password))) {
    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie("token", token, { secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    return res.json({ token, success: true });
  }

  res.status(401);
  throw new Error("Invalid credentials");
});

// @desc    Generate a refresh token
// @route   POST /api/users/refresh
// @access  Public
const refresh = asyncHandler(async (req, res) => {
  const throwLoginError = () => {
    res.status(401);
    throw new Error("Please login to continue");
  };

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throwLoginError();

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    // if refresh token is invalid, clear it on client side
    res.clearCookie("refreshToken");
    res.clearCookie("token");
  }

  const user = await User.findById(decoded._id);
  if (!user) throwLoginError();

  const newAccessToken = user.generateAuthToken();
  const newRefreshToken = user.generateRefreshToken();

  res.cookie("token", newAccessToken, { secure: true });
  res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true });
  res.json({ token: newAccessToken, success: true });
});

// @desc    Logout and clear the tokens
// @route   POST /api/users/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("token");
  res.json({ success: true });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const profile = asyncHandler(async (req, res) => {
  const { _id, username, profile_color, profile_url, invitations } = req.user;
  const toSend = {
    _id,
    username,
    profile_color,
    profile_url,
    invitations: invitations.reverse(),
  };

  res.json({ user: toSend, success: true });
});

// @desc    Update profile
// @route   PATCH /api/users/profile
// @access  Private
const updateProfilePic = asyncHandler(async (req, res) => {
  if (req.fileError) {
    res.status(400);
    throw new Error(req.fileError);
  }

  const result = await uploadImageToStorage(req.file, req.user);
  req.user.profile_url = result.secure_url;
  req.user.cloud_profile_id = result.public_id;
  await req.user.save();

  res.json({
    url: req.user.profile_url,
    message: "Profile updated successfully",
    success: true,
  });
});

// @desc    Remove profile picture
// @route   DELETE /api/users/profile
// @access  Private
const removeProfilePic = asyncHandler(async (req, res) => {
  if (!req.user.cloud_profile_id) {
    res.status(400);
    throw new Error("No profile picture");
  }

  await deleteImageFromStorage(req.user.cloud_profile_id);

  req.user.profile_url = undefined;
  req.user.cloud_profile_id = undefined;
  await req.user.save();

  res.json({ message: "Profile picture removed successfully", success: true });
});

// @desc    Search users by username
// @route   GET /api/users/search/:username
// @access  Private
const search = asyncHandler(async (req, res) => {
  const users = await User.find({
    username_lower: { $regex: req.params.username?.toLowerCase() },
  }).select("-createdAt -updatedAt -__v");

  // req.user should not be in the array
  const sendersIndex = users.findIndex(
    (user) => user._id.toString() === req.user._id.toString()
  );

  if (sendersIndex >= 0) users.splice(sendersIndex, 1);

  res.json({ users, success: true });
});

// @desc    Accept an invitation
// @route   POST /api/users/invitations/:invitationId
// @access  Private
const acceptInvitation = asyncHandler(async (req, res) => {
  const inviteIndex = searchForInvitation(req, res);
  const invitation = req.user.invitations[inviteIndex];

  const project = await Project.findById(invitation.project_id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (project.collaborators.includes(req.user._id)) {
    res.status(409);
    throw new Error("Already a collaborator");
  }

  project.collaborators.push(req.user._id);
  await project.save();
  req.user.invitations.splice(inviteIndex, 1);
  await req.user.save();

  res.json({ message: "Invitation accepted successfully", success: true });
});

// @desc    Remove an invitation
// @route   DELETE /api/users/invitations/:invitationId
// @access  Private
const removeInvitation = asyncHandler(async (req, res) => {
  const inviteIndex = searchForInvitation(req, res);

  req.user.invitations.splice(inviteIndex, 1);
  await req.user.save();

  res.json({ message: "Invitation removed successfully", success: true });
});

module.exports = {
  signup,
  login,
  logout,
  refresh,
  profile,
  updateProfilePic,
  removeProfilePic,
  search,
  acceptInvitation,
  removeInvitation,
};
