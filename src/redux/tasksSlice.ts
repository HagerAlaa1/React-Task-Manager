import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskState } from "../types/tasks";
import type Task from "../types/tasks";

// Initial state
const initialState: TaskState = {
  tasks: [],
  filter: "All",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },

    editTask: (state, action: PayloadAction<Task>) => {
      const { id, title, priority } = action.payload;

      const tasks = state.tasks.find(
        (t) => t.id === id
      );

      if (tasks) {
        tasks.title = title;
        tasks.priority = priority;
      }
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find(
        (t) => t.id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
      }
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  toggleTask,
  setFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;