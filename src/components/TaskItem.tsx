import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import type { TaskItemProps } from "../types/tasks";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../redux/tasksSlice";
import { CheckIcon } from "@heroicons/react/16/solid";
const priorityConfig = {
  High: {
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    bar: "bg-red-500",
    dot: "bg-red-400",
  },
  Medium: {
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    bar: "bg-amber-400",
    dot: "bg-amber-400",
  },
  Low: {
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    bar: "bg-emerald-400",
    dot: "bg-emerald-400",
  },
};
export default function TaskItem({ task, onEdit }: TaskItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const cfg = priorityConfig[task.priority];
  return (
    <section
      className={`group relative flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-300 
    ${task.completed ? "bg-blue-950/10 border-blue-900/20 opacity-60" : "bg-blue-950/30 border-blue-800/25 hover:border-blue-600/40 hover:bg-blue-900/25 hover:shadow-lg hover:shadow-blue-950/30"}
    `}
    >
      {/*Priority bar*/}
      <div
        className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full ${cfg.bar} opacity-60`}
      />
      {/*Checkbox*/}
      <button
        onClick={() => dispatch(toggleTask(task.id))}
        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer
        ${task.completed ? "bg-blue-500 border-blue-500 shadow-md shadow-blue-900/40" : "border-blue-600/40 hover:border-blue-400 hover:bg-blue-900/30"}
        `}
      >
        {task.completed && <CheckIcon className="w-3 h-3 text-white" />}
      </button>
      {/*Content*/}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font medium leading-snug transition-all duration-200 ${task.completed ? "line-through text-blue-400/40" : " text-blue-100"}`}
        >
          {task.title}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${cfg.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {task.priority}
          </span>
          {task.completed && (
            <span className="text-[10px] text-violet-400/60 font-semibold uppercase tracking-wider">
              done
            </span>
          )}
        </div>
      </div>
      {/*Actions*/}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-lg text-blue-400/60 hover:text-blue-300 hover:bg-blue-800/40 transition-all duration-150 cursor-pointer"
          title="Edit task"
        >
          <PencilSquareIcon className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-900/20 transition-all duration-150 cursor-pointer"
          title="Delete task"
        >
          <TrashIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
