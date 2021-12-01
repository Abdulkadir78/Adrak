import Typography from "@mui/material/Typography";

import noProjectsImage from "../../assets/images/no-projects.svg";

function NoProjects({ smScreen }) {
  return (
    <>
      <img src={noProjectsImage} alt="No projects" className="no-data-image" />

      <Typography
        mt={2}
        variant={smScreen ? "body1" : "h6"}
        align="center"
        sx={{ fontWeight: "light" }}
      >
        You do not have any projects yet.
      </Typography>

      <Typography
        display="inline"
        variant={smScreen ? "body1" : "h6"}
        color="primary"
        sx={{ fontWeight: "light" }}
      >
        Get started{" "}
      </Typography>

      <Typography
        display="inline"
        variant={smScreen ? "body1" : "h6"}
        sx={{ fontWeight: "light" }}
      >
        by clicking the add button on the bottom right.
      </Typography>
    </>
  );
}

export default NoProjects;
