import { configureStore } from "@reduxjs/toolkit";

import collaboratorsReducer from "./collaborators/collaborators-slice";
import projectsReducer from "./projects/projects-slice";
import themeReducer from "./theme/theme-slice";
import tasksReducer from "./tasks/tasks-slice";
import notesReducer from "./notes/notes-slice";
import authReducer from "./auth/auth-slice";
import userReducer from "./user/user-slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    notes: notesReducer,
    collaborators: collaboratorsReducer,
  },
});

export default store;
