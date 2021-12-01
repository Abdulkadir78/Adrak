import Button from "@mui/material/Button";

import StyledLink from "../Shared/StyledLink";

function GetStartedBtn() {
  return (
    <StyledLink to="/signup">
      <Button variant="contained" color="secondary" size="large">
        Get started
      </Button>
    </StyledLink>
  );
}

export default GetStartedBtn;
