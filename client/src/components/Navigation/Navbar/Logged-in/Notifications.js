import { useState } from "react";
import { useDispatch } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import { userActions } from "../../../../store/user/user-slice";
import useUserSelector from "../../../../hooks/selectors/useUserSelector";
import NotificationsMenu from "./NotificationsMenu";
import Snack from "../../../Shared/Alerts/Snack";

function Notifications({ user }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { collabError, message } = useUserSelector();
  const dispatch = useDispatch();

  const handleErrorSnackClose = () => {
    dispatch(userActions.resetCollabError());
  };

  const handleMessageSnackClose = () => {
    dispatch(userActions.resetMessage());
  };

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton sx={{ mx: 1 }} onClick={handleOpen}>
        <Badge badgeContent={user.invitations.length} color="primary">
          <NotificationsIcon sx={{ color: user.profile_color, fontSize: 28 }} />
        </Badge>
      </IconButton>

      <NotificationsMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        notifications={user.invitations}
      />

      {collabError && (
        <Snack
          severity="error"
          message={collabError}
          handleClose={handleErrorSnackClose}
        />
      )}

      {message && (
        <Snack
          severity="success"
          message={message}
          handleClose={handleMessageSnackClose}
        />
      )}
    </>
  );
}

export default Notifications;
