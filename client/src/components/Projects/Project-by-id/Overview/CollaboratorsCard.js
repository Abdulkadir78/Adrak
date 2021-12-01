import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiUserPlus } from "react-icons/fi";
import AvatarGroup from "@mui/material/AvatarGroup";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import { collabActions } from "../../../../store/collaborators/collaborators-slice";
import useUserSelector from "../../../../hooks/selectors/useUserSelector";
import ProfileAvatar from "../../../Shared/ProfileAvatar";
import InviteModal from "./InviteModal";

function CollaboratorsCard({ project }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { user } = useUserSelector();
  const { owner, collaborators } = project;

  const handleInviteModalOpen = () => {
    setOpen(true);
  };

  const handleInviteModalClose = () => {
    dispatch(collabActions.reset());
    setOpen(false);
  };

  return (
    <>
      <InviteModal
        open={open}
        handleClose={handleInviteModalClose}
        project={project}
      />

      <Card>
        <CardContent sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            mr={3}
            gutterBottom
            noWrap
            sx={{ fontWeight: "normal" }}
          >
            Collaborators
          </Typography>

          {user?._id === owner && (
            <Box ml="auto">
              <Button
                size="small"
                variant="contained"
                endIcon={<FiUserPlus size={15} style={{ marginBottom: 4 }} />}
                onClick={handleInviteModalOpen}
              >
                Invite
              </Button>
            </Box>
          )}
        </CardContent>

        <CardActions sx={{ ml: 1.5, my: 2 }}>
          {!collaborators?.length && (
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              gutterBottom
            >
              No collaborators for this project.
            </Typography>
          )}

          <AvatarGroup max={5}>
            {collaborators?.map((collab) => (
              <ProfileAvatar user={collab} key={collab._id} />
            ))}
          </AvatarGroup>
        </CardActions>
      </Card>
    </>
  );
}

export default CollaboratorsCard;
