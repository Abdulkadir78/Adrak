import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

import noProjectSelectedImage from "../../../assets/images/no-project-selected.svg";
import StyledLink from "../../Shared/StyledLink";
import NoDataGrid from "../../Shared/NoDataGrid";

function NoProjectSelected() {
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <NoDataGrid>
      <img
        src={noProjectSelectedImage}
        alt="No project selected"
        className="no-data-image"
      />

      <Typography
        mt={2}
        color="text.secondary"
        variant={smScreen ? "body1" : "h6"}
      >
        You have not selected any project.
      </Typography>

      <Typography
        display="inline"
        color="text.secondary"
        variant={smScreen ? "body1" : "h6"}
        sx={{ fontWeight: "light" }}
      >
        Select one from the{" "}
      </Typography>

      <StyledLink to="/projects">
        <Typography
          display="inline"
          color="primary"
          variant={smScreen ? "body1" : "h6"}
          sx={{ fontWeight: "light" }}
        >
          Projects{" "}
        </Typography>
      </StyledLink>

      <Typography
        display="inline"
        color="text.secondary"
        variant={smScreen ? "body1" : "h6"}
        sx={{ fontWeight: "light" }}
      >
        page to manage it here.{" "}
      </Typography>
    </NoDataGrid>
  );
}

export default NoProjectSelected;
