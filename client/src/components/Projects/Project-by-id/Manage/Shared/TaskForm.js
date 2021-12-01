import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { addTask, updateTask } from "../../../../../store/tasks/side-effects";
import useTasksSelector from "../../../../../hooks/selectors/useTasksSelector";
import useProjectsSelector from "../../../../../hooks/selectors/useProjectsSelector";
import taskSchema from "../../../../../validation-schemas/task";
import Error from "../../../../Shared/Alerts/Error";
import Input from "../../../../Shared/Input";

function TaskForm({ handleClose, taskType, task }) {
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [submitError, setSubmitError] = useState("");

  const { processing, addError, updateError } = useTasksSelector();
  const { project } = useProjectsSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setPriority(task.priority);
      setType(task.type);
    }
  }, [task]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const handlePriorityChange = (e, newPriority) => {
    setPriority(newPriority);
  };

  const handleTaskTypeChange = (e, newType) => {
    setType(newType);
  };

  const onSubmit = (data) => {
    submitError && setSubmitError("");

    if (!priority) {
      setSubmitError("Priority is required");
      return;
    }

    const newTask = { ...data, priority, type };

    if (task) {
      let isChanged = false;
      for (const key of Object.keys(newTask)) {
        if (task[key] !== newTask[key]) {
          isChanged = true;
          break;
        }
      }

      if (!isChanged) {
        handleClose?.();
        return;
      }
    }

    (!task
      ? dispatch(
          addTask({
            ...data,
            priority,
            type: taskType,
            projectId: project._id,
          })
        )
      : dispatch(
          updateTask({
            ...data,
            priority,
            type,
            prevTaskType: taskType,
            taskId: task._id,
            projectId: project._id,
          })
        )
    )
      .unwrap()
      .then(
        () => {
          (!task || taskType === type) && handleClose?.();
        },
        () => {}
      );
  };

  return (
    <>
      <Typography variant="h6" mx="auto" my={3} sx={{ fontWeight: "normal" }}>
        {!task ? "Add a task" : "Update task"}
      </Typography>

      <Container>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
          {(submitError || addError || updateError) && (
            <Error error={submitError || addError || updateError} />
          )}

          <Input
            fullWidth
            type="text"
            label="title"
            defaultValue={task?.title}
            register={register}
            errors={errors}
            rules={taskSchema.title}
            disabled={processing}
            autoFocus
          />

          <Input
            fullWidth
            multiline
            rows={4}
            type="text"
            label="body"
            defaultValue={task?.body}
            register={register}
            errors={errors}
            halfMargin
            rules={taskSchema.body}
            disabled={processing}
          />

          <FormLabel component="legend">Priority</FormLabel>
          <ToggleButtonGroup
            color="primary"
            value={priority}
            exclusive
            fullWidth
            onChange={handlePriorityChange}
            sx={{ mb: 3, mt: 1 }}
            disabled={processing}
          >
            <ToggleButton value="low">Low</ToggleButton>
            <ToggleButton value="medium">Medium</ToggleButton>
            <ToggleButton value="high">High</ToggleButton>
          </ToggleButtonGroup>

          {/* Show this field only for update  */}
          {task && (
            <>
              <FormLabel component="legend">Type</FormLabel>
              <ToggleButtonGroup
                color="primary"
                value={type}
                exclusive
                fullWidth
                onChange={handleTaskTypeChange}
                sx={{ mb: 4, mt: 1 }}
                disabled={processing}
              >
                <ToggleButton value="todo">Todo</ToggleButton>
                <ToggleButton value="in_progress">In progress</ToggleButton>
                <ToggleButton value="done">Done</ToggleButton>
              </ToggleButtonGroup>
            </>
          )}

          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={processing}
            >
              {!task ? "Create" : "Update"}
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default TaskForm;
