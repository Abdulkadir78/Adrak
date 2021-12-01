import Notifications from "./Notifications";
import UserAvatar from "./UserAvatar";

function LoggedInLinks({ user }) {
  return (
    <>
      <Notifications user={user} />
      <UserAvatar user={user} />
    </>
  );
}

export default LoggedInLinks;
