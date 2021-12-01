import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import ginger from "../../assets/images/ginger.png";

function Brand(props) {
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box {...props}>
      <IconButton
        href="/"
        sx={{
          borderRadius: 0,
          marginInline: smScreen ? (xsScreen ? 0 : 3) : 10,
        }}
      >
        <img
          src={ginger}
          alt="adrak-brand-logo"
          style={{ width: "2.5rem", height: "2.5rem" }}
        />

        <Typography
          variant="h4"
          color="secondary"
          mt={2}
          ml={0.5}
          sx={{ fontFamily: "Great Vibes, cursive" }}
        >
          Adrak
        </Typography>
      </IconButton>
    </Box>
  );
}

export default Brand;
