import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import LandingVisImg from "../../assets/images/landing-visualize.svg";
import GetStartedBtn from "./GetStartedBtn";

function VisualizeSection() {
  const mdScreenAndAbove = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      columnSpacing={11}
      mt={mdScreenAndAbove ? 20 : 10}
      px={mdScreenAndAbove ? 5 : 0}
    >
      <Grid item xs={11} md={6} mb={10}>
        <Typography display="inline" variant="h2" sx={{ fontWeight: "bold" }}>
          Visualize your progress
        </Typography>

        <Typography
          display="inline"
          variant="h2"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          .
        </Typography>

        <Typography
          my={3}
          variant="h6"
          color="textSecondary"
          sx={{ fontWeight: "normal" }}
        >
          Pictures speak a thousand words. Get started with some projects and we
          will show you your progress and some more stats using beautiful and
          easy to interpret charts 📈
        </Typography>

        <GetStartedBtn />
      </Grid>

      <Grid item xs={12} sm={8} md={6}>
        <img
          src={LandingVisImg}
          alt="Project collaboration"
          className="w-100"
        />
      </Grid>
    </Grid>
  );
}

export default VisualizeSection;
