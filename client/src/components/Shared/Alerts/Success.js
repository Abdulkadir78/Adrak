import Alert from "@mui/material/Alert";

function Success({ message }) {
  return (
    <Alert severity="success" sx={{ marginBottom: 3 }}>
      {message}
    </Alert>
  );
}

export default Success;
