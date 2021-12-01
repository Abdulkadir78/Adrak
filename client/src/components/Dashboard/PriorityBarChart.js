import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import { isZerosArr } from "../../utils/arrayHelpers";
import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import ChartContainer from "../Charts/ChartContainer";
import BarChart from "../Charts/BarChart";
import NoData from "../Charts/NoData";

function PriorityBarChart() {
  const { projects, loading } = useProjectsSelector();
  const [priorityCountObj, setPriorityCountObj] = useState(null);
  const [drawing, setDrawing] = useState(true);

  useEffect(() => {
    if (projects.length) {
      let taskObjsArr = projects.reduce((acc, project) => {
        acc.push(project.tasks);
        return acc;
      }, []);

      taskObjsArr = taskObjsArr.flat();
      const taskPriorityCountObj = { low: 0, medium: 0, high: 0 };

      taskObjsArr.forEach((taskObj) => {
        taskPriorityCountObj[taskObj?.priority] += 1;
      });

      const areAllValuesZeros = isZerosArr(Object.values(taskPriorityCountObj));
      setPriorityCountObj(areAllValuesZeros ? {} : taskPriorityCountObj);
    }

    !loading && setDrawing(false);
  }, [projects, loading]);

  return (
    <ChartContainer>
      <Typography variant="h5" align="center">
        Tasks by priority
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" mb={2}>
        across projects
      </Typography>

      {priorityCountObj ? (
        <BarChart
          series={[
            {
              name: "Tasks",
              data: Object.values(priorityCountObj),
            },
          ]}
          xLabels={Object.keys(priorityCountObj)}
        />
      ) : (
        <NoData loading={drawing} />
      )}
    </ChartContainer>
  );
}

export default PriorityBarChart;
