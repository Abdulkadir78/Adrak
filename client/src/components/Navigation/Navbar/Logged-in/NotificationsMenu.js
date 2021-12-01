import { useDispatch } from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupsIcon from "@mui/icons-material/Groups";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";

import {
  acceptCollabInvitation,
  removeCollabInvitation,
} from "../../../../store/user/side-effects";

const menuItemStyles = { overflowX: "auto", cursor: "default" };

function NotificationsMenu({ anchorEl, open, handleClose, notifications }) {
  const dispatch = useDispatch();

  const handleAcceptInvitation = (invitationId) => {
    handleClose();
    dispatch(acceptCollabInvitation(invitationId));
  };

  const handleIgnoreInvitation = (invitationId) => {
    handleClose();
    dispatch(removeCollabInvitation(invitationId));
  };

  return (
    <Menu
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {notifications.length ? (
        notifications.map((notif) => (
          <MenuItem disableRipple key={notif._id} sx={menuItemStyles}>
            <ListItemIcon sx={{ paddingLeft: 0.25 }}>
              <GroupsIcon color="primary" fontSize="small" />
            </ListItemIcon>

            {notif.body}

            <Box ml="auto">
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginInline: 2 }}
                onClick={() => {
                  handleAcceptInvitation(notif._id);
                }}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  handleIgnoreInvitation(notif._id);
                }}
              >
                Ignore
              </Button>
            </Box>
          </MenuItem>
        ))
      ) : (
        <MenuItem disableRipple sx={menuItemStyles}>
          <Typography color="textSecondary">No notifications</Typography>
        </MenuItem>
      )}
    </Menu>
  );
}

export default NotificationsMenu;
