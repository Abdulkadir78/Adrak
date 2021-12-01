import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";

import { getProjects } from "../../store/projects/side-effects";
import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import ChartContainer from "../Charts/ChartContainer";
import PieChart from "../Charts/CircularChart";
import NoData from "../Charts/NoData";

function TechPieChart() {
  const { projects, loading } = useProjectsSelector();
  const [techCountObj, setTechCountObj] = useState(null);
  const [drawing, setDrawing] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length) {
      let techObjsArr = projects.reduce((acc, project) => {
        acc.push(project.technologies);
        return acc;
      }, []);

      techObjsArr = techObjsArr.flat();

      const techArr = techObjsArr.reduce((acc, techObj) => {
        acc.push(techObj?.technology?.toLowerCase());
        return acc;
      }, []);

      const techCountMap = {};

      techArr.forEach((tech) => {
        // if technology doesn't exist in the object, initialize it to 1,
        // otherwise increment it's count by 1
        !techCountMap[tech]
          ? (techCountMap[tech] = 1)
          : (techCountMap[tech] += 1);
      });

      setTechCountObj(techCountMap);
    }

    !loading && setDrawing(false);
  }, [projects, loading]);

  return (
    <ChartContainer>
      <Typography variant="h5" align="center" mb={2}>
        Technologies used
      </Typography>

      {techCountObj ? (
        <PieChart
          series={Object.values(techCountObj)}
          labels={Object.keys(techCountObj)}
        />
      ) : (
        <NoData loading={drawing} />
      )}
    </ChartContainer>
  );
}

export default TechPieChart;
