import LinearProgress from "@mui/material/LinearProgress";

function ProgressAbsolute() {
  return (
    <LinearProgress
      color="primary"
      sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
    />
  );
}

export default ProgressAbsolute;
