import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import ChartContainer from "../Charts/ChartContainer";
import LineChart from "../Charts/LineChart";
import NoData from "../Charts/NoData";

function TasksCompletedLineChart() {
  const { projects, loading } = useProjectsSelector();
  const [taskCountObj, setTaskCountObj] = useState(null);
  const [drawing, setDrawing] = useState(true);

  useEffect(() => {
    if (projects.length) {
      let taskObjsArr = projects.reduce((acc, project) => {
        acc.push(project.tasks);
        return acc;
      }, []);

      taskObjsArr = taskObjsArr.flat();
      const doneTasksObjsArr = taskObjsArr.filter(
        (task) => task.type === "done"
      );

      const tasksCountOnDateObj = {};

      doneTasksObjsArr.forEach((task) => {
        let taskDate = new Date(task.updatedAt).toLocaleDateString("default", {
          day: "numeric",
          month: "short",
          year: "2-digit",
        });

        !tasksCountOnDateObj[taskDate]
          ? (tasksCountOnDateObj[taskDate] = 1)
          : (tasksCountOnDateObj[taskDate] += 1);
      });

      const dates = Object.keys(tasksCountOnDateObj);
      dates.sort((a, b) => new Date(a) - new Date(b));

      const finalTasksCount = {};
      dates
        .slice(-5)
        .forEach((date) => (finalTasksCount[date] = tasksCountOnDateObj[date]));

      setTaskCountObj(finalTasksCount);
    }

    !loading && setDrawing(false);
  }, [projects, loading]);

  return (
    <ChartContainer>
      <Typography variant="h5" align="center">
        Tasks completed
      </Typography>

      {taskCountObj ? (
        <LineChart
          series={[
            {
              name: "Tasks",
              data: Object.values(taskCountObj),
            },
          ]}
          xLabels={Object.keys(taskCountObj)}
        />
      ) : (
        <NoData loading={drawing} />
      )}
    </ChartContainer>
  );
}

export default TasksCompletedLineChart;
