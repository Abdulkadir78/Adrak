import { useDispatch } from "react-redux";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import axios from "axios";

import { authActions } from "../store/auth/auth-slice";
import { setTokenHeader } from "../utils/tokenHeader";

function useRefreshAuth() {
  const dispatch = useDispatch();

  const refreshAuthLogic = (failedRequest) =>
    axios
      .post("/api/users/refresh")
      .then((res) => {
        const newAccessToken = res.data.token;
        dispatch(authActions.setToken({ token: newAccessToken }));

        // use new access token in authorization header for all requests from now on
        setTokenHeader(newAccessToken);

        // fire the request again using new access token
        failedRequest.response.config.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        return Promise.resolve();
      })
      .catch(() => {
        dispatch(authActions.setToken({ token: "" }));
      });

  createAuthRefreshInterceptor(axios, refreshAuthLogic);
}

export default useRefreshAuth;
