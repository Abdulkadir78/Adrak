import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Portal from "@mui/material/Portal";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Snack({
  severity,
  message,
  handleClose,
  vertical = "bottom",
  horizontal = "left",
}) {
  const [open, setOpen] = useState(true);

  const handleSnackClose = (e, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    handleClose?.();
  };

  return (
    <Portal>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Portal>
  );
}

export default Snack;
