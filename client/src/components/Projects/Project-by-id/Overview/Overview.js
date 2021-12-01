import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

import { isZerosArr } from "../../../../utils/arrayHelpers";
import ChartContainer from "../../../Charts/ChartContainer";
import DonutChart from "../../../Charts/CircularChart";
import CollaboratorsCard from "./CollaboratorsCard";
import BarChart from "../../../Charts/BarChart";
import OverviewCard from "./OverviewCard";

function Overview({ project }) {
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const arrangeByPriority = () => {
    const init = { low: 0, medium: 0, high: 0 };

    project?.tasks &&
      Object.values(project?.tasks)
        ?.flat()
        ?.reduce((acc, task) => {
          acc[task.priority] += 1;
          return acc;
        }, init);

    const match = isZerosArr(Object.values(init));
    return !match ? Object.values(init) : [];
  };

  const taskDistributionData = () => {
    const arr = [
      project?.tasks?.todo?.length,
      project?.tasks?.in_progress?.length,
      project?.tasks?.done?.length,
    ];

    const match = isZerosArr(arr);
    return !match ? arr : [];
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} lg={3} order={xsScreen ? 3 : 0}>
          <OverviewCard title="Todos" content={project?.tasks?.todo?.length} />
        </Grid>

        <Grid item xs={12} sm={4} lg={3} order={1}>
          <OverviewCard
            title="Tasks in progress"
            content={project?.tasks?.in_progress?.length}
          />
        </Grid>

        <Grid item xs={12} sm={4} lg={3} order={2}>
          <OverviewCard
            title="Tasks completed"
            content={project?.tasks?.done?.length}
          />
        </Grid>

        <Grid item xs={12} sm={4} lg={3} order={xsScreen ? 0 : 3}>
          <CollaboratorsCard project={project} />
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} sm={6} lg={6}>
          <ChartContainer>
            <BarChart
              title="Tasks by priority"
              xLabels={["Low", "Medium", "High"]}
              series={[
                {
                  name: "Tasks",
                  data: arrangeByPriority(),
                },
              ]}
            />
          </ChartContainer>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <ChartContainer>
            <DonutChart
              type="donut"
              title="Tasks distribution"
              series={taskDistributionData()}
              labels={["Todo", "In progress", "Done"]}
              legendOffset={50}
            />
          </ChartContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default Overview;
