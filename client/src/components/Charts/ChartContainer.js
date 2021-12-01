import Paper from "@mui/material/Paper";

function ChartContainer({ children }) {
  return <Paper sx={{ px: 2, pt: 3, height: "100%" }}>{children}</Paper>;
}

export default ChartContainer;
