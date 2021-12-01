import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import { deleteTask } from "../../../../../store/tasks/side-effects";
import { colors } from "../../../../../constants";
import UpdateTaskModal from "./TaskModal";

const TaskCard = forwardRef(({ projectId, task }, ref) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask({ projectId, taskId: task._id, taskType: task.type }));
  };

  return (
    <div ref={ref}>
      <UpdateTaskModal
        open={open}
        handleClose={handleModalClose}
        taskType={task.type}
        task={task}
      />

      <Card sx={{ mt: 3, borderRadius: 1 }}>
        <CardContent>
          <Box>
            <Chip
              label={task.priority}
              variant="outlined"
              size="small"
              sx={{
                mb: 1,
                textTransform: "uppercase",
                color: colors[task.priority],
                borderColor: colors[task.priority],
              }}
            />

            <Typography variant="h6" noWrap>
              {task.title}
            </Typography>
          </Box>

          <Typography
            sx={{ mt: 1.5, wordWrap: "break-word", whiteSpace: "pre-wrap" }}
          >
            {task.body}
          </Typography>

          <CardActions sx={{ mb: -3, ml: -1.5 }}>
            <IconButton color="info" size="small" onClick={handleModalOpen}>
              <CreateIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <IconButton
              color="error"
              size="small"
              onClick={handleDelete}
              sx={{ mr: 2 }}
            >
              <DeleteIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <Typography variant="caption" color="text.secondary" ml="auto">
              Last updated: {new Date(task.updatedAt).toDateString()}
            </Typography>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
});

export default TaskCard;
