import FlipMove from "react-flip-move";

import useProjectsSelector from "../../../../../hooks/selectors/useProjectsSelector";
import useTasksSelector from "../../../../../hooks/selectors/useTasksSelector";
import SortByDropdown from "../Shared/SortByDropdown";
import TasksLoading from "../Shared/TasksLoading";
import OuterCard from "../Shared/OuterCard";
import TaskCard from "../Shared/TaskCard";
import NoTasks from "../Shared/NoTasks";

function InProgress() {
  const { in_progress, loading, in_progressLoading } = useTasksSelector();
  const { project } = useProjectsSelector();

  return (
    <OuterCard title="In Progress" taskType="in_progress">
      {in_progress.length > 1 && (
        <SortByDropdown taskType="in_progress" disabled={in_progressLoading} />
      )}

      {loading || in_progressLoading ? (
        <TasksLoading />
      ) : (
        <FlipMove>
          {in_progress.map((task) => (
            <TaskCard key={task._id} projectId={project._id} task={task} />
          ))}
        </FlipMove>
      )}

      {!in_progress.length && !loading && <NoTasks />}
    </OuterCard>
  );
}

export default InProgress;
