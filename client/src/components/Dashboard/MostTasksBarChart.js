import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import { isZerosArr } from "../../utils/arrayHelpers";
import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import ChartContainer from "../Charts/ChartContainer";
import BarChart from "../Charts/BarChart";
import NoData from "../Charts/NoData";

function MostTasksBarChart() {
  const { projects, loading } = useProjectsSelector();
  const [projectTasksObj, setProjectTasksObj] = useState(null);
  const [drawing, setDrawing] = useState(true);

  useEffect(() => {
    if (projects.length) {
      let tasksByProjectObj = projects.reduce((acc, project) => {
        acc[project.name] = project.tasks.length;
        return acc;
      }, {});

      const sortedProjectNames = Object.keys(tasksByProjectObj).sort(
        (a, b) => tasksByProjectObj[b] - tasksByProjectObj[a]
      );

      let tasksByProjectObjFinal = {};
      sortedProjectNames
        .slice(0, 5)
        .forEach(
          (projectName) =>
            (tasksByProjectObjFinal[projectName] =
              tasksByProjectObj[projectName])
        );

      const areAllValuesZeros = isZerosArr(
        Object.values(tasksByProjectObjFinal)
      );
      setProjectTasksObj(areAllValuesZeros ? {} : tasksByProjectObjFinal);
    }

    !loading && setDrawing(false);
  }, [projects, loading]);

  return (
    <ChartContainer>
      <Typography variant="h5" align="center">
        Most tasks
      </Typography>

      {projectTasksObj ? (
        <BarChart
          horizontal
          isMultiColor
          series={[
            {
              name: "Tasks",
              data: Object.values(projectTasksObj),
            },
          ]}
          xLabels={Object.keys(projectTasksObj)}
        />
      ) : (
        <NoData loading={drawing} />
      )}
    </ChartContainer>
  );
}

export default MostTasksBarChart;
