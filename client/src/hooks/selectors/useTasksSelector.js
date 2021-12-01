import { useSelector } from "react-redux";

function useTasksSelector() {
  const tasksState = useSelector((state) => state.tasks);
  return tasksState;
}

export default useTasksSelector;
