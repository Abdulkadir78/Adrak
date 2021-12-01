import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";

import LandingHeroImg from "../../assets/images/landing.svg";
import GetStartedBtn from "./GetStartedBtn";

function Hero() {
  const mdScreenAndBelow = useMediaQuery((theme) =>
    theme.breakpoints.down("lg")
  );
  const mdScreenAndAbove = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const mdScreen = mdScreenAndAbove && mdScreenAndBelow;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Toolbar />
      <Toolbar />

      <Grid
        container
        justifyContent="center"
        ml={!mdScreenAndBelow ? 8 : 0}
        mt={mdScreen ? 5 : 0}
        px={mdScreen ? 5 : 0}
      >
        <Grid item xs={11} md={5} lg={4} mt={mdScreenAndBelow ? -2 : 6} mb={5}>
          <Typography
            display="inline"
            variant="h2"
            className="bold"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
          >
            Project management made easy
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
            mt={2}
            mb={3}
            pr={5}
            variant="h6"
            color="textSecondary"
            sx={{ fontWeight: "normal" }}
          >
            From development to deployment, management has never been easier.
          </Typography>

          <GetStartedBtn />
        </Grid>

        <Grid item xs={12} md={7} lg={8}>
          <img
            src={LandingHeroImg}
            alt="Project management"
            className="w-100"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Hero;
