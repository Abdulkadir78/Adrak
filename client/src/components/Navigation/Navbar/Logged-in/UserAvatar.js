import { useState } from "react";
import { useDispatch } from "react-redux";

import { userActions } from "../../../../store/user/user-slice";
import CircularAvatarSkeleton from "../../../Shared/Loaders/Skeletons/CircularAvatar";
import useUserSelector from "../../../../hooks/selectors/useUserSelector";
import ProfileAvatar from "../../../Shared/ProfileAvatar";
import Snack from "../../../Shared/Alerts/Snack";
import UserMenu from "./UserMenu";

function UserAvatar({ user }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { profilePicLoading, profilePicError } = useUserSelector();
  const dispatch = useDispatch();

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = () => {
    dispatch(userActions.resetProfilePicError());
  };

  return (
    <>
      {profilePicLoading ? (
        <CircularAvatarSkeleton />
      ) : (
        <ProfileAvatar
          user={user}
          onClick={handleOpen}
          className="cursor-pointer no-click-overlay"
        />
      )}

      <UserMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        user={user}
      />

      {profilePicError && (
        <Snack
          severity="error"
          message={profilePicError}
          handleClose={handleSnackClose}
        />
      )}
    </>
  );
}

export default UserAvatar;
