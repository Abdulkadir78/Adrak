import FlipMove from "react-flip-move";

import useProjectsSelector from "../../../../../hooks/selectors/useProjectsSelector";
import useTasksSelector from "../../../../../hooks/selectors/useTasksSelector";
import SortByDropdown from "../Shared/SortByDropdown";
import TasksLoading from "../Shared/TasksLoading";
import OuterCard from "../Shared/OuterCard";
import TaskCard from "../Shared/TaskCard";
import NoTasks from "../Shared/NoTasks";

function Todos() {
  const { todo, loading, todoLoading } = useTasksSelector();
  const { project } = useProjectsSelector();

  return (
    <OuterCard title="Todo" taskType="todo">
      {todo.length > 1 && (
        <SortByDropdown taskType="todo" disabled={todoLoading} />
      )}

      {loading || todoLoading ? (
        <TasksLoading />
      ) : (
        <FlipMove>
          {todo.map((task) => (
            <TaskCard key={task._id} projectId={project._id} task={task} />
          ))}
        </FlipMove>
      )}

      {!todo.length && !loading && <NoTasks />}
    </OuterCard>
  );
}

export default Todos;
