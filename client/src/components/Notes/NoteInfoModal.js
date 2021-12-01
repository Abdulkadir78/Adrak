import { useState } from "react";
import { useDispatch } from "react-redux";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import { styles } from "../../constants";
import { deleteNote, updateNote } from "../../store/notes/side-effects";

function NoteInfoModal({ projectId, note, open, handleModalClose }) {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: note.title,
    body: note.body,
  });

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setValues({
      title: note.title,
      body: note.body,
    });
    handleModalClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.title !== note.title || note.body !== values.body)
      dispatch(updateNote({ projectId, noteId: note._id, ...values }));

    handleModalClose();
  };

  const handleDelete = () => {
    dispatch(deleteNote({ projectId, noteId: note._id }));
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} scroll="paper">
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <InputBase
              name="title"
              fullWidth
              placeholder="Title"
              autoComplete="off"
              sx={{ fontWeight: "bold" }}
              value={values.title}
              onChange={handleChange}
            />
          </DialogTitle>

          <DialogContent>
            <InputBase
              name="body"
              fullWidth
              placeholder="Take a note..."
              autoComplete="off"
              sx={styles.scrollbar}
              multiline
              rows={4}
              value={values.body}
              onChange={handleChange}
            />
          </DialogContent>

          <DialogActions>
            <IconButton
              onClick={handleDelete}
              sx={{ position: "absolute", left: 13, bottom: 9 }}
            >
              <DeleteIcon fontSize="small" color="primary" />
            </IconButton>
            <Button onClick={handleSubmit}>Done</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default NoteInfoModal;
