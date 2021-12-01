import axios from "axios";

import asyncHandler from "../../../../utils/asyncHandler";

const projectNotes = asyncHandler(async (projectId) => {
  const response = await axios.get(`/api/projects/${projectId}/notes`);
  return response.data;
});

const addProjectNote = asyncHandler(async (projectId, noteDetails) => {
  const response = await axios.post(
    `/api/projects/${projectId}/notes`,
    noteDetails
  );
  return response.data;
});

const deleteProjectNote = asyncHandler(async (projectId, noteId) => {
  const response = await axios.delete(
    `/api/projects/${projectId}/notes/${noteId}`
  );
  return response.data;
});

const updateProjectNote = asyncHandler(
  async (projectId, noteId, noteDetails) => {
    const response = await axios.patch(
      `/api/projects/${projectId}/notes/${noteId}`,
      noteDetails
    );
    return response.data;
  }
);

export { projectNotes, addProjectNote, deleteProjectNote, updateProjectNote };
