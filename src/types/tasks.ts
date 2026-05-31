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

export interface ContainerProps {
  children: React.ReactNode,
  className?: string
}

export interface TaskFormProps {
  editingTask: Task | null;
  onCancelEdit: () => void;
}
