import { useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import NoteInfoModal from "./NoteInfoModal";

function Note({ projectId, note }) {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        onClick={handleModalOpen}
        className="cursor-pointer no-click-overlay"
      >
        <CardContent>
          <Typography gutterBottom sx={{ fontWeight: "bold" }}>
            {note.title}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {note.body}
          </Typography>
        </CardContent>

        <CardActions>
          <Typography variant="caption" color="text.secondary" ml="auto">
            Updated: {new Date(note.updatedAt).toDateString()}
          </Typography>
        </CardActions>
      </Card>

      <NoteInfoModal
        projectId={projectId}
        note={note}
        open={open}
        handleModalClose={handleModalClose}
      />
    </>
  );
}
export default Note;
