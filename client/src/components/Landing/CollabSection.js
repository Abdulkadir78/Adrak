import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import LandingCollabImg from "../../assets/images/landing-collab.svg";
import GetStartedBtn from "./GetStartedBtn";

function CollabSection() {
  const mdScreenAndAbove = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Grid
      container
      justifyContent="center"
      columnSpacing={12}
      mt={mdScreenAndAbove ? 15 : 10}
      px={mdScreenAndAbove ? 5 : 0}
    >
      <Grid item xs={12} sm={8} md={6} order={!mdScreenAndAbove ? 2 : 1}>
        <img
          src={LandingCollabImg}
          alt="Project collaboration"
          className="collabSectionImg w-100"
        />
      </Grid>

      <Grid item xs={11} md={6} mb={10} order={!mdScreenAndAbove ? 1 : 2}>
        <Typography display="inline" variant="h2" sx={{ fontWeight: "bold" }}>
          Teamwork makes the dream work
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
          variant="h6"
          color="textSecondary"
          sx={{ fontWeight: "normal" }}
        >
          You can invite users to become collaborators on your personal project.
          It's simple, Create a project
          <KeyboardArrowRightIcon fontSize="small" sx={{ mb: -0.5 }} />
          Send an invite
          <KeyboardArrowRightIcon fontSize="small" sx={{ mb: -0.5 }} />
          Work together 🤝
        </Typography>

        <GetStartedBtn />
      </Grid>
    </Grid>
  );
}

export default CollabSection;
