import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import TasksCompletedLineChart from "./TasksCompletedLineChart";
import MostTasksBarChart from "./MostTasksBarChart";
import PriorityBarChart from "./PriorityBarChart";
import TasksDonutChart from "./TasksDonutChart";
import TechPieChart from "./TechPieChart";

function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" mb={2} sx={{ fontWeight: "bold" }}>
        Dashboard
      </Typography>

      <Grid container spacing={5} mb={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TasksCompletedLineChart />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MostTasksBarChart />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TasksDonutChart />
        </Grid>

        <Grid item xs={12} sm={6}>
          <PriorityBarChart />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TechPieChart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
