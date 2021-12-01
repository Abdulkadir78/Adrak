import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Masonry from "react-masonry-css";

import { getNotes } from "../../store/notes/side-effects";
import useNotesSelector from "../../hooks/selectors/useNotesSelector";
import NotesSkeleton from "./NotesSkeleton";
import Snack from "../Shared/Alerts/Snack";
import AddNoteForm from "./AddNoteForm";
import BackBtn from "../Shared/BackBtn";
import NoData from "../Shared/NoData";
import NoNotes from "./NoNotes";
import Note from "./Note";

import classes from "./Notes.module.css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function Notes() {
  const { loading, notes, error, fetchError } = useNotesSelector();
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getNotes(params.id));
  }, [dispatch, params.id]);

  return (
    <Container>
      <BackBtn />

      {fetchError ? (
        <NoData imgAlt="No notes data" />
      ) : loading ? (
        <Skeleton
          height={80}
          sx={{ mx: "auto", mt: 4, width: xsScreen ? "100%" : "50%" }}
        />
      ) : (
        <AddNoteForm projectId={params.id} />
      )}

      {(error || fetchError) && (
        <Snack severity="error" message={error || fetchError} />
      )}

      {!notes.length && !fetchError && !loading ? (
        <NoNotes />
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classes["masonry-grid"]}
          columnClassName={classes["masonry-grid_column"]}
        >
          {loading
            ? [...Array(4)].map((_, i) => <NotesSkeleton key={i} />)
            : notes.map((note) => (
                <Note projectId={params.id} key={note._id} note={note} />
              ))}
        </Masonry>
      )}
    </Container>
  );
}

export default Notes;
