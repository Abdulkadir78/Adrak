import axios from "axios";

import asyncHandler from "../../../../utils/asyncHandler";

const userLogin = asyncHandler(async (credentials) => {
  const response = await axios.post("/api/users/login", credentials, {
    skipAuthRefresh: true,
  });
  return response.data;
});

const userSignup = asyncHandler(async (details) => {
  const response = await axios.post("/api/users/signup", details, {
    skipAuthRefresh: true,
  });
  return response.data;
});

const userLogout = asyncHandler(async () => {
  const response = await axios.post("/api/users/logout");
  return response.data;
});

export { userLogin, userSignup, userLogout };
