import { makeAutoObservable, runInAction } from "mobx";
import { Task } from "../models/Task";
import { TaskStatus } from "../models/TaskStatus";
import agent from "../api/agent";

export default class TaskStore {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isModalOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  //loading from database (video 71)
  loadTasks = async () => {
    try {
      const tasks = await agent.Tasks.list();
      runInAction(() => {
        tasks.forEach((task) => this.tasks.push(task));
      });
    } catch (error) {
      console.log(error);
    }
    console.log(this.tasks);
  };

  openModal = () => {
    console.log("open modal");
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.isModalOpen = false;
  };

  saveTask = (task: { id?: number; title: string; text: string }) => {
    if (task.id) {
      this.tasks = this.tasks.map((t) =>
        t.id === task.id ? { ...t, title: task.title, text: task.text } : t
      );
    } else {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: task.title,
        text: task.text,
        status: TaskStatus.Pending, // Default status
      };
      this.tasks.push(newTask);
    }

    this.selectedTask = null;
    this.closeModal();
  };

  selectTask = (task: Task | null) => {
    this.selectedTask = task;
  };
  deleteTask = (id: number) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  };
  editTask = (task: Task) => {
    this.selectTask(task);
    this.isModalOpen = true;
  };
}
