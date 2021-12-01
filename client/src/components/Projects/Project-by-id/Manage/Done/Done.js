import FlipMove from "react-flip-move";

import useProjectsSelector from "../../../../../hooks/selectors/useProjectsSelector";
import useTasksSelector from "../../../../../hooks/selectors/useTasksSelector";
import SortByDropdown from "../Shared/SortByDropdown";
import TasksLoading from "../Shared/TasksLoading";
import OuterCard from "../Shared/OuterCard";
import TaskCard from "../Shared/TaskCard";
import NoTasks from "../Shared/NoTasks";

function Done() {
  const { done, loading, doneLoading } = useTasksSelector();
  const { project } = useProjectsSelector();

  return (
    <OuterCard title="Done" taskType="done">
      {done.length > 1 && (
        <SortByDropdown taskType="done" disabled={doneLoading} />
      )}

      {loading || doneLoading ? (
        <TasksLoading />
      ) : (
        <FlipMove>
          {done.map((task) => (
            <TaskCard key={task._id} projectId={project._id} task={task} />
          ))}
        </FlipMove>
      )}

      {!done.length && !loading && <NoTasks />}
    </OuterCard>
  );
}

export default Done;
