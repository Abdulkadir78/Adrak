import axios from "axios";

import asyncHandler from "../../../../utils/asyncHandler";

const searchUsers = asyncHandler(async (username) => {
  const response = await axios.get(`/api/users/search/${username}`);
  return response.data;
});

const sendCollabInvitation = asyncHandler(async (projectId, userId) => {
  const response = await axios.post(
    `/api/projects/${projectId}/collaborators/${userId}`
  );
  return response.data;
});

const removeCollab = asyncHandler(async (projectId, userId) => {
  const response = await axios.delete(
    `/api/projects/${projectId}/collaborators/${userId}`
  );
  return response.data;
});

export { searchUsers, sendCollabInvitation, removeCollab };
