import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";

import StyledLink from "../../../Shared/StyledLink";

function LoggedOutLinks() {
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <StyledLink to="/login" style={{ marginRight: xsScreen ? 0 : "20px" }}>
        <Button
          variant={xsScreen ? "text" : "outlined"}
          color="secondary"
          size={xsScreen ? "medium" : "large"}
        >
          Login
        </Button>
      </StyledLink>
    </>
  );
}

export default LoggedOutLinks;
