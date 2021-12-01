import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

function ScrollToTopBtn() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    const anchor = document.querySelector("#backToTopAnchor");
    anchor && anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 50,
          "@media (max-width: 600px)": {
            bottom: 20,
            right: 20,
          },
        }}
      >
        <Fab
          size="small"
          color="primary"
          aria-label="scroll back to top"
          disableRipple
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

export default ScrollToTopBtn;
