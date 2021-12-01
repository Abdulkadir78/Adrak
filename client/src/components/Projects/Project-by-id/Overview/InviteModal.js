import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import DoneIcon from "@mui/icons-material/Done";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import debounce from "@mui/utils/debounce";

import { collabActions } from "../../../../store/collaborators/collaborators-slice";
import {
  search,
  sendInvitation,
  removeCollaborator,
} from "../../../../store/collaborators/side-effects";

import useCollabSelector from "../../../../hooks/selectors/useCollabSelector";
import ProgressAbsolute from "../../../Shared/Loaders/ProgressAbsolute";
import ProfileAvatar from "../../../Shared/ProfileAvatar";
import Success from "../../../Shared/Alerts/Success";
import Error from "../../../Shared/Alerts/Error";

function InviteModal({ open, handleClose, project }) {
  const [collabIds, setCollabIds] = useState([]);
  const [inviteSentTo, setInviteSentTo] = useState([]);
  const [showNoUsers, setShowNoUsers] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, searchError, message, users } = useCollabSelector();
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const userIds = project.collaborators.reduce((acc, collab) => {
      return [...acc, collab._id];
    }, []);

    setCollabIds(userIds);
  }, [project.collaborators]);

  const handleModalClose = () => {
    showNoUsers && setShowNoUsers(false);
    handleClose?.();
  };

  const handleChange = debounce((e) => {
    if (e.target.value.trim()) {
      setShowNoUsers(true);
      dispatch(search(e.target.value));
      return;
    }
    dispatch(collabActions.reset());
    setShowNoUsers(false);
  }, 1000);

  const handleInvite = (userId) => {
    dispatch(sendInvitation({ projectId: project?._id, userId }))
      .unwrap()
      .then(
        () => {
          setInviteSentTo((prevInvites) => {
            return [...prevInvites, userId];
          });
        },
        () => {}
      );
  };

  const handleRemoveCollab = (userId) => {
    dispatch(removeCollaborator({ projectId: project?._id, userId }));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={xsScreen}
      open={open}
      onClose={handleModalClose}
    >
      {loading && <ProgressAbsolute />}

      <Typography variant="h6" ml={3} mt={2}>
        Invite a collaborator
      </Typography>

      <Typography variant="caption" color="primary" ml={3} mb={1}>
        Maximum 5 collaborators per project
      </Typography>

      <DialogContent>
        {message && <Success message={message} />}
        {searchError && <Error error={searchError} />}
        {error && <Error error={error} />}

        <TextField
          variant="outlined"
          color="secondary"
          label="Username"
          onChange={handleChange}
          disabled={loading}
          fullWidth
          autoFocus
        />

        {!loading && showNoUsers && !users.length ? (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mt={2}
          >
            No users found
          </Typography>
        ) : (
          <>
            {!users.length && (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                mt={2}
              >
                Start typing to see search results
              </Typography>
            )}

            <List>
              {users?.map((user) => (
                <ListItem key={user._id} disableGutters disabled={loading}>
                  <ProfileAvatar user={user} />
                  <Typography ml={3} noWrap>
                    {user.username}
                  </Typography>

                  {!collabIds.includes(user._id) &&
                  !inviteSentTo.includes(user._id) ? (
                    <Button
                      size={xsScreen ? "small" : "medium"}
                      endIcon={<SendIcon />}
                      sx={{ ml: "auto" }}
                      disabled={loading}
                      onClick={() => handleInvite(user._id)}
                    >
                      Invite
                    </Button>
                  ) : inviteSentTo.includes(user._id) ? (
                    <Button
                      color="success"
                      size={xsScreen ? "small" : "medium"}
                      endIcon={<DoneIcon />}
                      sx={{ ml: "auto" }}
                      disableRipple
                    >
                      Invited
                    </Button>
                  ) : (
                    <Button
                      color="error"
                      size={xsScreen ? "small" : "medium"}
                      endIcon={<DeleteIcon />}
                      sx={{ ml: "auto" }}
                      disabled={loading}
                      onClick={() => handleRemoveCollab(user._id)}
                    >
                      Remove
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteModal;
