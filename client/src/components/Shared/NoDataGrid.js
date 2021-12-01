import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function NoDataGrid({ children }) {
  return (
    <Container>
      <Grid container mt={5} justifyContent="center">
        <Grid item xs={12} sm={7} md={6} sx={{ textAlign: "center" }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

export default NoDataGrid;
