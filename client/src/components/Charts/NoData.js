import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Spinner from "../Shared/Loaders/Spinner";

function NoData({ loading }) {
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box height={smScreen ? 300 : 400} position="relative">
      {loading ? (
        <Spinner />
      ) : (
        <Typography
          align="center"
          color="text.secondary"
          className="center-absolute"
        >
          Nothing to see here
        </Typography>
      )}
    </Box>
  );
}

export default NoData;
