import axios from "axios";

import asyncHandler from "../../../../utils/asyncHandler";

const projectTasks = asyncHandler(async (projectId) => {
  const response = await axios.get(`/api/projects/${projectId}/tasks`);
  return response.data;
});

const addProjectTask = asyncHandler(async (projectId, taskDetails) => {
  const response = await axios.post(
    `/api/projects/${projectId}/tasks`,
    taskDetails
  );
  return response.data;
});

const deleteProjectTask = asyncHandler(async (projectId, taskId) => {
  const response = await axios.delete(
    `/api/projects/${projectId}/tasks/${taskId}`
  );
  return response.data;
});

const updateProjectTask = asyncHandler(
  async (projectId, taskId, taskDetails) => {
    const response = await axios.patch(
      `/api/projects/${projectId}/tasks/${taskId}`,
      taskDetails
    );
    return response.data;
  }
);

export { projectTasks, addProjectTask, deleteProjectTask, updateProjectTask };
