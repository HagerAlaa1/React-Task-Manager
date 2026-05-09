import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import type { TaskState } from "../types/tasks";
//Load tasks from LocalStorage
export const LoadTasksFromStorage = () => {
  try {
    const data = localStorage.getItem("tasks");
    if (!data) return undefined;
    return {
      tasks: JSON.parse(data),
    };
  } catch (err) {
    return [];
  }
};

//Save Tasks to LocalStorage
export const saveTasksToStorage = (state: { task: TaskState }) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(state.task));
  } catch (err) {
    console.log("Failed to Save Tasks to Local Storage", err);
  }
};
export const preloadedState = LoadTasksFromStorage();

export const store = configureStore({
  reducer: {
    task: tasksReducer,
  },
  preloadedState,
});

//Subscribe to store changes and save tasks to localStorage
store.subscribe(() => {
  saveTasksToStorage(store.getState());
});

export default store;
