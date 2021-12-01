import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";

import { projectActions } from "../../store/projects/projects-slice";
import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import ProjectForm from "./ProjectForm";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddProject({ smScreen }) {
  const [open, setOpen] = useState(false);
  const { loading, addError } = useProjectsSelector();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    !loading && setOpen(true);
  };

  const handleClose = () => {
    addError && dispatch(projectActions.resetErrors());
    setOpen(false);
  };

  return (
    <>
      <Fab
        size={smScreen ? "medium" : "large"}
        color="primary"
        sx={{
          position: "fixed",
          right: 60,
          bottom: 60,
          ...(smScreen && { right: 25, bottom: 25 }),
        }}
        onClick={handleClickOpen}
      >
        <AddIcon sx={{ fontSize: 28 }} />
      </Fab>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          color="inherit"
          onClick={handleClose}
          sx={{ mx: "auto" }}
          disabled={loading}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <ProjectForm handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default AddProject;
