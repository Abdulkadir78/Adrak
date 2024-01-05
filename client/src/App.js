import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Landing from "./screens/Landing/Landing";
import Signup from "./screens/Signup/Signup";
import Login from "./screens/Login/Login";
import ErrorBoundary from "./components/Miscellanous/ErrorBoundary";
import PrivateRoute from "./components/Miscellanous/PrivateRoute";
import PublicRoute from "./components/Miscellanous/PublicRoute";
import Spinner from "./components/Shared/Loaders/Spinner";
import useCustomTheme from "./hooks/useCustomTheme";
import useRefreshAuth from "./hooks/useRefreshAuth";
import useAuth from "./hooks/useAuth";

const ProjectById = lazy(() => import("./screens/Project-by-id/ProjectById"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Dashboard = lazy(() => import("./screens/Dashboard/Dashboard"));
const NotFound = lazy(() => import("./screens/404/NotFound"));
const Notes = lazy(() => import("./screens/Notes/Notes"));

function App() {
  const theme = useCustomTheme();
  const authLoading = useAuth();
  useRefreshAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            {!authLoading && (
              <Switch>
                <PublicRoute exact path="/" component={Landing} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/signup" component={Signup} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/projects" component={Projects} />
                <PrivateRoute path="/project/:id/notes" component={Notes} />
                <PrivateRoute path="/project/:id" component={ProjectById} />
                <Route path="*" component={NotFound} />
              </Switch>
            )}
          </Suspense>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
