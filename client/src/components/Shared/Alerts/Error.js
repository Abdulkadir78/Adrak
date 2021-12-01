import Alert from "@mui/material/Alert";

function Error({ error }) {
  return (
    <Alert severity="error" sx={{ marginBottom: 3 }}>
      {error}
    </Alert>
  );
}

export default Error;
