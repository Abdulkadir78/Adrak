import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const styles = {
  paddingTop: 5,
  paddingBottom: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function PaperContainer({ children }) {
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} sx={smScreen ? styles : null}>
          {smScreen ? (
            children
          ) : (
            <Paper
              sx={{
                ...styles,
                position: "relative",
              }}
            >
              {children}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaperContainer;
