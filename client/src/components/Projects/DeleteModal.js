import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import { deleteProject } from "../../store/projects/side-effects";

function DeleteModal({ project, open, handleClose }) {
  const dispatch = useDispatch();
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleDelete = () => {
    dispatch(deleteProject(project._id));
    handleClose();
  };

  return (
    <Dialog fullScreen={xsScreen} open={open} onClose={handleClose}>
      <DialogTitle>Delete project?</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" display="inline">
          Are you sure you want to delete this project -{" "}
        </Typography>
        <Typography
          color="primary"
          display="inline"
          sx={{ fontWeight: "bold" }}
        >
          {project.name}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleDelete(project._id);
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
