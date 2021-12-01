import Avatar from "@mui/material/Avatar";

function ProfileAvatar({ user, ...props }) {
  return (
    <Avatar
      sx={{
        bgcolor: user?.profile_url ? "none" : user?.profile_color,
        color: "white",
        ml: 1,
        width: 35,
        height: 35,
      }}
      src={user?.profile_url}
      {...props}
    >
      {user?.profile_url ? null : user?.username?.charAt(0)?.toUpperCase()}
    </Avatar>
  );
}

export default ProfileAvatar;
