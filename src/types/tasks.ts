export type Priority = "Low" | "Medium" | "High";

export type Filter = "All" | Priority | "Completed" | "Incomplete";

export default interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
}

export interface TaskState {
  tasks: Task[];
  filter: Filter;
}
