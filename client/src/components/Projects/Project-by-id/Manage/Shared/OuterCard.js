import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import { colors } from "../../../../../constants";
import AddTaskModal from "./TaskModal";

function OuterCard({ children, title, taskType }) {
  const [open, setOpen] = useState(false);
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddTaskModal open={open} handleClose={handleClose} taskType={taskType} />

      <Card
        sx={{
          height: 500,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 3.5,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.scrollbar,
            borderRadius: 3.5,
          },
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant={xsScreen ? "h4" : "h5"}
              noWrap
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </Typography>

            <Fab
              color="primary"
              size="small"
              disableRipple
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
          </Box>

          {children}
        </CardContent>
      </Card>
    </>
  );
}

export default OuterCard;
