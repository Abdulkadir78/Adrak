import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function Footer() {
  return (
    <Paper sx={{ py: 4, textAlign: "center", mt: 10 }}>
      <Typography display="inline">Made with 🤎 by </Typography>

      <a
        href="https://github.com/Abdulkadir78"
        target="_blank"
        rel="noopener noreferrer"
        className="no-click-overlay"
      >
        <Typography color="secondary" display="inline">
          Abdulkadir
        </Typography>
      </a>
    </Paper>
  );
}

export default Footer;
