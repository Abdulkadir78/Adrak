import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";

import ProgressAbsolute from "../../../../Shared/Loaders/ProgressAbsolute";
import useTasksSelector from "../../../../../hooks/selectors/useTasksSelector";
import TaskForm from "./TaskForm";

function TaskModal({ open, handleClose, taskType, task }) {
  const { processing } = useTasksSelector();
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleModalClose = () => {
    if (processing) return;
    handleClose?.();
  };

  return (
    <Dialog fullScreen={xsScreen} open={open} onClose={handleModalClose}>
      {processing && <ProgressAbsolute />}

      <IconButton
        color="inherit"
        onClick={handleModalClose}
        sx={{ mx: "auto", mb: 1 }}
        disabled={processing}
      >
        <CloseIcon fontSize={xsScreen ? "large" : "medium"} />
      </IconButton>

      {/* "task" prop will be undefined in case of adding a new task */}
      {/* It will be an object in case of updating */}
      <TaskForm
        task={task}
        taskType={taskType}
        handleClose={handleModalClose}
      />
    </Dialog>
  );
}

export default TaskModal;
