import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { getProjects } from "../../store/projects/side-effects";
import { projectActions } from "../../store/projects/projects-slice";
import ProjectCardSkeleton from "../Shared/Loaders/Skeletons/ProjectCard";
import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import useUserSelector from "../../hooks/selectors/useUserSelector";
import Snack from "../Shared/Alerts/Snack";
import ProjectCard from "./ProjectCard";
import AddProject from "./AddProject";
import NoProjects from "./NoProjects";
import UpdateModal from "./UpdateModal";

function Projects() {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState(null);

  const { loading, projects, error, updateError } = useProjectsSelector();
  const { user } = useUserSelector();
  const dispatch = useDispatch();

  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleSnackClose = () => {
    dispatch(projectActions.resetErrors());
  };

  const handleUpdateModalOpen = (e, index) => {
    e.stopPropagation();
    setProjectToUpdate(projects[index]);
    setUpdateOpen(true);
  };

  const handleUpdateModalClose = () => {
    updateError && dispatch(projectActions.resetErrors());
    setUpdateOpen(false);
  };

  return (
    <Container sx={{ ...(loading && { height: "90vh", overflowY: "hidden" }) }}>
      {error && (
        <Snack
          severity="error"
          message={error}
          handleClose={handleSnackClose}
        />
      )}

      {/* convert projects.length to a boolean with !! */}
      {(!!projects.length || loading) && (
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Projects
        </Typography>
      )}

      <Grid
        container
        mt={-2}
        mb={3}
        spacing={5}
        justifyContent={!projects.length ? "center" : "flex-start"}
      >
        {loading ? (
          [...Array(6)].map((_, i) => (
            <Grid key={i} item xs={12} md={6} lg={4}>
              <ProjectCardSkeleton />
            </Grid>
          ))
        ) : !projects.length ? (
          <Grid item xs={12} sm={7} md={6} sx={{ textAlign: "center" }}>
            <NoProjects smScreen={smScreen} />
          </Grid>
        ) : (
          projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              userId={user._id}
              index={index}
              handleUpdateModalOpen={handleUpdateModalOpen}
            />
          ))
        )}
      </Grid>

      <AddProject smScreen={smScreen} />
      <UpdateModal
        project={projectToUpdate}
        open={updateOpen}
        handleClose={handleUpdateModalClose}
      />
    </Container>
  );
}

export default Projects;
