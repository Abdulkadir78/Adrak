import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Skeleton from "@mui/material/Skeleton";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import { drawerWidth } from "../../../constants";
import CircularAvatarSkeleton from "../../Shared/Loaders/Skeletons/CircularAvatar";
import ProgressAbsolute from "../../Shared/Loaders/ProgressAbsolute";
import useAuthSelector from "../../../hooks/selectors/useAuthSelector";
import useUserSelector from "../../../hooks/selectors/useUserSelector";
import LoggedOutLinks from "./Logged-out/LoggedOutLinks";
import LoggedInLinks from "./Logged-in/LoggedInLinks";
import DarkModeSwitch from "./DarkModeSwitch";
import Snack from "../../Shared/Alerts/Snack";
import Brand from "../../Shared/Brand";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  marginLeft: drawerWidth,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Navbar({ open, toggleDrawer }) {
  const { loading: authLoading, error: authError } = useAuthSelector();
  const { loading, user, error } = useUserSelector();
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <AppBar
        color="inherit"
        position="fixed"
        open={open}
        sx={{ marginBottom: 20 }}
      >
        <Toolbar>
          {((loading && user) || authLoading) && <ProgressAbsolute />}

          {(error || authError) && (
            <Snack severity="error" message={error || authError} />
          )}

          {/* Hamburger menu icon for small screens */}
          {smScreen && user && (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon color="secondary" sx={{ fontSize: 28 }} />
            </IconButton>
          )}

          {/* Show branding on larger screens and leave space on smaller ones */}
          {/* If user is not logged in, branding will be shown regardless of screen size */}
          {user && xsScreen ? (
            <Box sx={{ flexGrow: 0.9 }} />
          ) : (
            <Brand sx={{ flexGrow: 0.9 }} />
          )}

          {user ? (
            <>
              <DarkModeSwitch />
              <LoggedInLinks user={user} />
            </>
          ) : (
            <>
              {!loading && !error && <LoggedOutLinks />}
              <DarkModeSwitch />
            </>
          )}

          {/* loaders to show while fetching user profile */}
          {loading && !user && (
            <>
              <Skeleton
                variant="circular"
                width={30}
                height={30}
                sx={{ mr: 2, ml: 1 }}
              />
              <CircularAvatarSkeleton />
            </>
          )}
        </Toolbar>
      </AppBar>

      <div id="backToTopAnchor" />
    </>
  );
}

export default Navbar;
