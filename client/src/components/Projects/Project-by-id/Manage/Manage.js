import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";

import { getTasks } from "../../../../store/tasks/side-effects";
import { taskActions } from "../../../../store/tasks/tasks-slice";
import useTasksSelector from "../../../../hooks/selectors/useTasksSelector";
import Snack from "../../../Shared/Alerts/Snack";
import InProgress from "./InProgress/InProgress";
import Todos from "./Todos/Todos";
import Done from "./Done/Done";

function Manage({ projectId }) {
  const dispatch = useDispatch();
  const { error } = useTasksSelector();

  useEffect(() => {
    dispatch(getTasks(projectId));
  }, [dispatch, projectId]);

  const handleSnackClose = () => {
    dispatch(taskActions.resetErrors());
  };

  return (
    <Grid container spacing={5} justifyContent="center">
      {error && (
        <Snack
          severity="error"
          message={error}
          handleClose={handleSnackClose}
        />
      )}

      <Grid item xs={12} sm={6} lg={4}>
        <Todos />
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <InProgress />
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <Done />
      </Grid>
    </Grid>
  );
}

export default Manage;
