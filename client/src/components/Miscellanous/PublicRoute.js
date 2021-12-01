import { Route, Redirect } from "react-router-dom";

import useAuthSelector from "../../hooks/selectors/useAuthSelector";

function PublicRoute(props) {
  const { authToken } = useAuthSelector();

  return authToken ? <Redirect to="/dashboard" /> : <Route {...props} />;
}

export default PublicRoute;
