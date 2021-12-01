import { useState } from "react";
import { useHistory } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import DeleteModal from "./DeleteModal";

function ProjectCard({ project, userId, index, handleUpdateModalOpen }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const history = useHistory();

  const handleDeleteModalOpen = (e) => {
    e.stopPropagation();
    setDeleteOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteOpen(false);
  };

  return (
    <>
      <DeleteModal
        project={project}
        open={deleteOpen}
        handleClose={handleDeleteModalClose}
      />

      <Grid item xs={12} md={6} lg={4}>
        <Card
          onClick={() => {
            history.push(`/project/${project._id}`);
          }}
          className="cursor-pointer no-click-overlay"
          sx={{
            py: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            {userId !== project.owner && (
              <Chip
                label="Collaborator"
                color="primary"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
            )}

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5" noWrap sx={{ width: "60%" }}>
                {project.name}
              </Typography>

              {userId === project.owner && (
                <Box>
                  <IconButton
                    color="primary"
                    sx={{ mt: -0.5 }}
                    onClick={(e) => handleUpdateModalOpen(e, index)}
                  >
                    <CreateOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    sx={{ mt: -0.5, mr: -1 }}
                    onClick={handleDeleteModalOpen}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Typography my={2} sx={{ whiteSpace: "pre-wrap" }}>
              {project.description}
            </Typography>
          </CardContent>

          {project.technologies && (
            <CardActions sx={{ ml: 1 }}>
              <Grid container rowSpacing={2} columnSpacing={2}>
                {project.technologies.map((tech) => (
                  <Grid
                    item
                    key={tech._id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Chip size="small" label={tech.technology} />
                  </Grid>
                ))}
              </Grid>
            </CardActions>
          )}
        </Card>
      </Grid>
    </>
  );
}

export default ProjectCard;
