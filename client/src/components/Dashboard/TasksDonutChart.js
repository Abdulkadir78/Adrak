import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import { isZerosArr } from "../../utils/arrayHelpers";
import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import ChartContainer from "../Charts/ChartContainer";
import DonutChart from "../Charts/CircularChart";
import NoData from "../Charts/NoData";

function TasksDonutChart() {
  const { projects, loading } = useProjectsSelector();
  const [taskTypeCountObj, setTaskTypeCountObj] = useState(null);
  const [drawing, setDrawing] = useState(true);

  useEffect(() => {
    if (projects.length) {
      let taskObjsArr = projects.reduce((acc, project) => {
        acc.push(project.tasks);
        return acc;
      }, []);

      taskObjsArr = taskObjsArr.flat();
      const typeCountObj = { todo: 0, in_progress: 0, done: 0 };

      taskObjsArr.forEach((taskObj) => {
        typeCountObj[taskObj?.type] += 1;
      });

      const areAllValuesZeros = isZerosArr(Object.values(typeCountObj));
      setTaskTypeCountObj(areAllValuesZeros ? {} : typeCountObj);
    }

    !loading && setDrawing(false);
  }, [projects, loading]);

  return (
    <ChartContainer>
      <Typography variant="h5" align="center">
        Tasks distribution
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" mb={2}>
        across projects
      </Typography>

      {taskTypeCountObj ? (
        <DonutChart
          type="donut"
          series={Object.values(taskTypeCountObj)}
          labels={["Todo", "In progress", "Done"]}
        />
      ) : (
        <NoData loading={drawing} />
      )}
    </ChartContainer>
  );
}

export default TasksDonutChart;
