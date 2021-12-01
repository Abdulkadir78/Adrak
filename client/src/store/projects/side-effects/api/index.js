import axios from "axios";

import asyncHandler from "../../../../utils/asyncHandler";

const userProjects = asyncHandler(async () => {
  const response = await axios.get("/api/projects");
  return response.data;
});

const addUserProject = asyncHandler(async (projectDetails) => {
  const response = await axios.post("/api/projects", projectDetails);
  return response.data;
});

const deleteUserProject = asyncHandler(async (projectId) => {
  const response = await axios.delete(`/api/projects/${projectId}`);
  return response.data;
});

const updateUserProject = asyncHandler(async (projectId, projectDetails) => {
  const response = await axios.patch(
    `/api/projects/${projectId}`,
    projectDetails
  );
  return response.data;
});

const userProjectById = asyncHandler(async (projectId) => {
  const response = await axios.get(`/api/projects/${projectId}`);
  return response.data;
});

export {
  userProjects,
  addUserProject,
  deleteUserProject,
  updateUserProject,
  userProjectById,
};
