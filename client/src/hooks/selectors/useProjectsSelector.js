import { useSelector } from "react-redux";

function useProjectsSelector() {
  const projectsState = useSelector((state) => state.projects);
  return projectsState;
}

export default useProjectsSelector;
