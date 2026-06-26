import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { setFilter } from "../redux/tasksSlice";

const Filters = ["All", "High", "Medium", "Low", "Completed"] as const;

const filterConfig = {
  All: {
    icon: "◈",
    activeClass: "from-blue-600 to-blue-500 text-white shadow-blue-900/40",
  },
  High: {
    icon: "●",
    activeClass: "from-red-600 to-red-500 text-white shadow-red-900/40",
  },
  Medium: {
    icon: "●",
    activeClass: "from-amber-600 to-amber-500 text-white shadow-amber-900/40",
  },
  Low: {
    icon: "●",
    activeClass:
      "from-emerald-600 to-emerald-500 text-white shadow-emerald-900/40",
  },
  Completed: {
    icon: "✓",
    activeClass:
      "from-violet-600 to-violet-500 text-white shadow-violet-900/40",
  },
};

export default function TaskFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilter = useSelector((s: RootState) => s.tasks.filter);

  return (
    <div className="flex flex-wrap gap-2 ">
      {Filters.map((f) => {
        const cfg = filterConfig[f];
        const isActive = currentFilter === f;
        return (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f))}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-50 flex items-center gap-1.5 cursor-pointer
          ${
            isActive
              ? `bg-linear-to-r ${cfg.activeClass} shadow-lg`
              : "bg-blue-950/40 border border-blue-800/30 text-blue-400/60 hover:text-blue-300 hover:border-blue-700/50"
          }
          `}
          >
            <span
              className={`
              text-[10px]
              ${f === "All" || f === "Completed" ? "" : f === "High" ? "text-red-400" : f === "Medium" ? "text-amber-400" : "text-emerald-400"}
              ${isActive ? "text-white/80" : ""}
              `}
            >
              {cfg.icon}
            </span>
            {f}
          </button>
        );
      })}
    </div>
  );
}
