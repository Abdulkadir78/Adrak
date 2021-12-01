import { forwardRef } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import ProjectForm from "./ProjectForm";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UpdateModal({ project, open, handleClose }) {
  const { loading } = useProjectsSelector();

  return (
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

      <ProjectForm project={project} handleClose={handleClose} />
    </Dialog>
  );
}

export default UpdateModal;
