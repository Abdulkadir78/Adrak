import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

import noNotesImage from "../../assets/images/no-notes.svg";
import NoDataGrid from "../Shared/NoDataGrid";

function NoNotes() {
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <NoDataGrid>
      <img
        src={noNotesImage}
        alt="No project selected"
        className="no-data-image"
        style={{ marginTop: "50px" }}
      />

      <Typography
        mt={4}
        color="text.secondary"
        variant={smScreen ? "body1" : "h6"}
        sx={{ fontWeight: "light" }}
      >
        It feels so empty in here
      </Typography>

      <Typography
        color="text.secondary"
        variant={smScreen ? "body1" : "h6"}
        sx={{ fontWeight: "light" }}
      >
        Let's create a note.
      </Typography>
    </NoDataGrid>
  );
}

export default NoNotes;
