import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Navbar from "../Navbar/Navbar";
import Icons from "../Sidebar/IconLinks";

function MobileNav() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box mb={3}>
      <Navbar toggleDrawer={toggleDrawer} />
      <Toolbar />

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <IconButton
          color="secondary"
          onClick={toggleDrawer}
          sx={{ ml: "auto", mt: 2, mr: 2 }}
        >
          <ChevronLeftIcon sx={{ fontSize: 28 }} />
        </IconButton>

        <Box px={5}>
          <Icons handleDrawerToggle={toggleDrawer} />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}

export default MobileNav;
