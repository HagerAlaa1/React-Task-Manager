import { useSelector } from "react-redux";
import type Task from "../types/tasks";
import type { RootState } from "../redux/store";
import TaskFilter from "./TaskFilter";

function TaskList() {
  const { tasks, filter } = useSelector((s: RootState) => s.task);
  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    return task.priority === filter && !task.completed;
  });
  const status = {
    total: tasks.length,
    complete: tasks.filter((t: Task) => t.completed).length,
    high: tasks.filter((t: Task) => t.priority === "High" && !t.completed)
      .length,
  };
  return (
    <section className="flex flex-col h-full">
      {/*status bar*/}
      <div className="flex items-baseline gap-4 mb-5 px-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-blue-100">
            {status.total}
          </span>
          <span className="text-xs text-blue-400/60 font-semibold">total</span>
        </div>
        <div className="w-px h-6 text-blue-800/40" />
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-emerald-400">
            {status.complete}
          </span>
          <span className="text-xs text-blue-400/60 font-semibold">done</span>
        </div>
        {status.high > 0 && (
          <>
            <div className="w-px h-6 text-blue-800/40" />
            <div className="flex items-baseline gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-semibold text-red-400">
                {status.high} urgent
              </span>
            </div>
          </>
        )}
      </div>
      {/*progress bar*/}
      {tasks.length > 0 && (
        <div className="mb-5 px-1">
          <div className="h-1 rounded-full overflow-hidden bg-blue-950/60">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{
                width: `${tasks.length ? (status.complete / status.total) * 100 : 0}%`,
              }}
            />
          </div>
          <p className="text-right text-[10px] text-blue-400/50 mt-1 font-medium">
            {tasks.length
              ? Math.round((status.complete / status.total) * 100)
              : 0}
            % complete
          </p>
        </div>
      )}
      {/*filters*/}
      <div className="mb-4">
        <TaskFilter/>
      </div>
      {/*tasks list*/}
    </section>
  );
}

export default TaskList;
