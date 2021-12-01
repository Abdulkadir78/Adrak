import { useParams } from "react-router-dom";

import NoProjectSelected from "./NoProjectSelected";
import Project from "./Project";

function ProjectById() {
  const params = useParams();

  if (params.id === "no-project-selected") {
    return <NoProjectSelected />;
  }

  return <Project projectId={params.id} />;
}

export default ProjectById;
