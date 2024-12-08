import { TaskStatus } from "./TaskStatus";

export type Task = {
  id: number;
  title: string;
  text: string;
  taskType: TaskStatus;
};
