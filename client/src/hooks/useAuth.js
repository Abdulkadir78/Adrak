import { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { authActions } from "../store/auth/auth-slice";
import { getUserProfile } from "../store/user/side-effects";
import { setTokenHeader, removeTokenHeader } from "../utils/tokenHeader";

function useAuth() {
  const [authLoading, setAuthLoading] = useState(true);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      removeTokenHeader();
      dispatch(authActions.setToken({ token: "" }));
      setAuthLoading(false);
      return;
    }

    dispatch(authActions.setToken({ token }));
    setTokenHeader(token);
    dispatch(getUserProfile());
    setAuthLoading(false);
  }, [dispatch]);

  return authLoading;
}

export default useAuth;
