import { useDispatch } from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { logout } from "../../../../store/auth/side-effects";
import {
  updateProfilePic,
  removeProfilePic,
} from "../../../../store/user/side-effects";

const menuStyles = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

function UserMenu({ anchorEl, open, handleClose, user }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.set("profilePic", file);
      handleClose();
      dispatch(updateProfilePic(formData));
    }
  };

  const handleRemovePic = () => {
    handleClose();
    dispatch(removeProfilePic());
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: menuStyles,
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem component="label">
        <ListItemIcon>
          <PersonIcon color="primary" />
        </ListItemIcon>
        Change profile picture
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg"
        />
      </MenuItem>

      <MenuItem onClick={handleRemovePic} disabled={!user?.profile_url}>
        <ListItemIcon sx={{ paddingLeft: 0.25 }}>
          <DeleteIcon color="primary" fontSize="small" />
        </ListItemIcon>
        Remove profile picture
      </MenuItem>

      <MenuItem onClick={handleLogout}>
        <ListItemIcon sx={{ paddingLeft: 0.25 }}>
          <LockIcon color="primary" fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}

export default UserMenu;
