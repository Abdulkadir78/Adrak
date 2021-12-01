import { Route, Redirect } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import useAuthSelector from "../../hooks/selectors/useAuthSelector";
import MobileNav from "../Navigation/Mobile-navigation/MobileNav";
import Sidebar from "../Navigation/Sidebar/Sidebar";

function PrivateRoute({ component: Component, ...props }) {
  const { authToken } = useAuthSelector();
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  if (!authToken) {
    return <Redirect to="/login" />;
  }

  return smScreen ? (
    <>
      <MobileNav />
      <Route {...props} component={Component} />
    </>
  ) : (
    <Route
      {...props}
      render={(routeProps) => (
        <Sidebar>
          <Component {...routeProps} />
        </Sidebar>
      )}
    />
  );
}

export default PrivateRoute;
