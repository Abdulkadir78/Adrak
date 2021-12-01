import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { userProfile } from "../../user/side-effects/api";
import { userLogin, userSignup, userLogout } from "./api";
import { setTokenHeader, removeTokenHeader } from "../../../utils/tokenHeader";

const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  const response = await userLogin(credentials);
  if (response.error) return thunkAPI.rejectWithValue(response);
  setTokenHeader(response.token);

  const profileResponse = await userProfile(response.token);
  if (profileResponse.error) {
    Cookies.remove("token"); // server sets a cookie in response to successful login
    removeTokenHeader();
    return thunkAPI.rejectWithValue(profileResponse);
  }

  return { ...response, ...profileResponse };
});

const signup = createAsyncThunk("auth/signup", async (details, thunkAPI) => {
  if (details.password !== details.confirm_password) {
    return thunkAPI.rejectWithValue({ error: "Passwords don't match" });
  }

  const response = await userSignup(details);
  if (response.error) return thunkAPI.rejectWithValue(response);

  return { message: "Your account has been created. Please login to continue" };
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const response = await userLogout();
  if (response.error) return thunkAPI.rejectWithValue(response);
  removeTokenHeader();
});

export { login, signup, logout };
