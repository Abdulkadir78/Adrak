import { useState } from "react";
import { useDispatch } from "react-redux";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";

import { styles } from "../../constants";
import { addNote } from "../../store/notes/side-effects";

const defaultValues = {
  title: "",
  body: "",
};

function AddNoteForm({ projectId }) {
  const dispatch = useDispatch();

  const [showTitleField, setShowTitleField] = useState(false);
  const [values, setValues] = useState(defaultValues);

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowTitleField = () => {
    setShowTitleField(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(values.title.trim() || values.body.trim())) {
      setValues({ title: "", body: "" });
      setShowTitleField(true);
      return;
    }

    dispatch(addNote({ projectId, ...values }));
    setValues(defaultValues);
    setShowTitleField(false);
  };

  return (
    <Grid container mt={4} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Paper sx={{ position: "relative" }}>
          <form onSubmit={handleSubmit}>
            {showTitleField && (
              <InputBase
                fullWidth
                name="title"
                placeholder="Title"
                autoComplete="off"
                value={values.title}
                onChange={handleChange}
                sx={{ px: 2, pt: 2, fontWeight: "bold" }}
              />
            )}

            <InputBase
              name="body"
              fullWidth
              placeholder="Take a note..."
              autoComplete="off"
              rows={4}
              multiline={showTitleField}
              autoFocus={showTitleField}
              onFocus={handleShowTitleField}
              value={values.body}
              onChange={handleChange}
              sx={{ p: 2, ...styles.scrollbar }}
            />

            <Fab
              type="submit"
              color="primary"
              size="medium"
              sx={{ position: "absolute", right: 25, bottom: -20 }}
            >
              <AddIcon />
            </Fab>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddNoteForm;
