import { useHistory } from "react-router";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Typography from "@mui/material/Typography";

function BackBtn() {
  const history = useHistory();

  return (
    <span className="cursor-pointer no-click-overlay" onClick={history.goBack}>
      <KeyboardBackspaceIcon color="action" />
      <Typography
        mt={2}
        display="inline"
        variant="body2"
        color="text.secondary"
      >
        Back
      </Typography>
    </span>
  );
}

export default BackBtn;
