import axios from "axios";

import asyncHandler from "../../../../utils/asyncHandler";

const userProfile = asyncHandler(async () => {
  const response = await axios.get("/api/users/profile");
  return response.data;
});

const updateUserProfilePic = asyncHandler(async (data) => {
  const response = await axios.patch("/api/users/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
});

const removeUserProfilePic = asyncHandler(async () => {
  const response = await axios.delete("/api/users/profile");
  return response.data;
});

const acceptInvitation = asyncHandler(async (invitationId) => {
  const response = await axios.post(`/api/users/invitations/${invitationId}`);

  return response.data;
});

const removeInvitation = asyncHandler(async (invitationId) => {
  const response = await axios.delete(`/api/users/invitations/${invitationId}`);

  return response.data;
});

export {
  userProfile,
  updateUserProfilePic,
  removeUserProfilePic,
  acceptInvitation,
  removeInvitation,
};
