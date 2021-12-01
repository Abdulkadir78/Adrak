import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
const Landing = lazy(() => import("./screens/Landing/Landing"));
const NotFound = lazy(() => import("./screens/404/NotFound"));
const Signup = lazy(() => import("./screens/Signup/Signup"));
const Login = lazy(() => import("./screens/Login/Login"));
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
