import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import notFoundImg from "../../assets/images/404-not-found.svg";
import NoDataGrid from "../Shared/NoDataGrid";
import StyledLink from "../Shared/StyledLink";

function NotFound() {
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <NoDataGrid>
      <Box mt={5}>
        <img
          src={notFoundImg}
          alt="404 page not found"
          className="no-data-image"
        />

        <Typography
          mt={5}
          color="text.secondary"
          variant={smScreen ? "body1" : "h6"}
        >
          The page you are looking for does not exist.
        </Typography>

        <Typography
          color="text.secondary"
          variant={smScreen ? "body1" : "h6"}
          sx={{ fontWeight: "light" }}
        >
          You may have mistyped the url or the page may have moved.
        </Typography>

        <StyledLink to="/">
          <Button
            variant="contained"
            size={smScreen ? "medium" : "large"}
            sx={{ my: 3 }}
          >
            Go Home
          </Button>
        </StyledLink>
      </Box>
    </NoDataGrid>
  );
}

export default NotFound;
