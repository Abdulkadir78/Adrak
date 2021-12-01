import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

import noDataImage from "../../assets/images/no-data.svg";
import NoDataGrid from "./NoDataGrid";

function NoData({ imgAlt }) {
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <NoDataGrid>
      <img src={noDataImage} alt={imgAlt} className="no-data-image" />

      <Typography
        mt={3}
        color="text.secondary"
        variant={smScreen ? "body1" : "h6"}
        sx={{ fontWeight: "light" }}
      >
        There seems to be a problem
      </Typography>

      <Typography
        display="inline"
        color="text.secondary"
        variant={smScreen ? "body1" : "h6"}
        sx={{ fontWeight: "light" }}
      >
        Please try again later.
      </Typography>
    </NoDataGrid>
  );
}

export default NoData;
