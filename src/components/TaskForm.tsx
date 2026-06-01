import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { Priority, TaskFormProps } from "../types/tasks";
import { editTask, addTask } from "../redux/tasksSlice";
import type { AppDispatch } from "../redux/store";
import { nanoid } from "nanoid";
import {
  PencilSquareIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";

const PRIORITIES = ["High", "Medium", "Low"] as const;
type priority = (typeof PRIORITIES)[number];
const PriorityConfigs = {
  High: {
    color: "text-red-400",
    bgColor: "bg-red-500/20 border-red-500/40",
    dotColor: "bg-red-500",
  },
  Medium: {
    color: "text-amber-400",
    bgColor: "bg-amber-500/20 border-amber-500/40",
    dotColor: "bg-amber-400",
  },
  Low: {
    color: "text-emerald-400",
    bgColor: "bg-emerald-950/20 border-emerald-800/30",
    dotColor: "bg-emerald-700",
  },
};

export default function TaskForm({ editingTask, onCancelEdit }: TaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    if (editingTask) {
      dispatch(editTask({ ...editingTask, title: title.trim(), priority }));
      onCancelEdit();
    } else {
      dispatch(
        addTask({
          id: nanoid(),
          title: title.trim(),
          priority,
          completed: false,
        }),
      );
    }
    setTitle("");
    setPriority("Medium");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape" && editingTask) onCancelEdit();
  };
  return (
    <section className="px-3 pb-6">
      {/*title input*/}
      <div className="relative">
        <div className="absolute inset-y-0 pl-4 flex items-center pointer-events-none">
          <PencilSquareIcon className="w-4 h-4 text-blue-400/60" />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            editingTask ? "Edit your task…" : "What needs to be done?"
          }
          className="w-full pl-11 pr-4 py-3.5 bg-blue-950/40 rounded-xl border border-blue-700/30 text-blue-100 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 placeholder:text-blue-500/50 transition duration-200 text-sm-custom font-medium"
        />
      </div>
      {/*Priority selector*/}
      <div className="flex flex-col justify-between mt-5">
        <p className="text-blue-400/70 text-xs-custom font-semibold uppercase tracking-widest pl-1 mb-2.5">
          Priority
        </p>
        <div className="grid grid-cols-3 gap-2">
          {PRIORITIES.map((p) => {
            const config = PriorityConfigs[p];
            const isActive = priority === p;
            return (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs-custom font-semibold transition-all duration-200 cursor-pointer 
              ${isActive ? `${config.bgColor} ${config.color} shadow-lg scale-[1.02]` : "bg-blue-950/20 border-blue-800/30 text-blue-400/50 hover:border-blue-700/50 hover:text-blue-400/80"}
              `}
              >
                <span
                  className={`w-2 h-2 rounded-full ${isActive ? config.dotColor : "bg-blue-700/40"} transition-colors `}
                />
                {p}
              </button>
            );
          })}
        </div>
      </div>
      {/*Action Buttons*/}
      <div className="flex gap-2 mt-5">
        {editingTask && (
          <button
            onClick={() => {
              (onCancelEdit(), setTitle(""), setPriority("Medium"));
            }}
            className="flex-1 py-3 rounded-xl border border-blue-700/30 text-blue-400/70 text-sm-custom font-semibold hover:bg-blue-900/20 hover:text-blue-300 transition-all duration-200 cursor-pointer "
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className={`flex-1 py-3 rounded-xl text-sm-custom font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${title.trim() ? "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-900/40 hover:shadow-blue-700/40 hover:scale-[1.01]" : "bg-blue-900/20 text-blue-600/40 cursor-not-allowed"}`}
        >
          {editingTask ? (
            <>
              <CheckIcon className="w-4 h-4 " /> Save Changes
            </>
          ) : (
            <>
              <PlusIcon className="w-4 h-4 " /> Add Task
            </>
          )}
        </button>
      </div>
    </section>
  );
}
