import React, {useState} from 'react';
import './App.css';
import TaskLine from './features/TaskLine/TaskLine.component';
import TaskModal from './features/TaskModal/TaskModal.component';
import { TaskStatus } from './models/TaskStatus';
import { Task } from './models/Task';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveTask = (task: { id?: number; title: string; text: string }) => {
    if (task.id) {
      // Editing an existing task
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, title: task.title, text: task.text } : t
        )
      );
    } else {
      // Adding a new task
      const newTask: Task = {
        id: tasks.length + 1,
        title: task.title,
        text: task.text,
        status: TaskStatus.Pending,
      };
      setTasks([...tasks, newTask]);
    }
    setSelectedTask(null);
    setIsModalOpen(false);
  };
  

  function handleDragEnd(event: DragEndEvent){
    const {active, over} = event;

    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as Task['status'];

    setTasks(() => tasks.map(task => task.id === taskId ? {
      ...task,
      status: newStatus,
    } : task))
  }

  const handleDeleteTask = (id: number) => {
    console.log("Deleting task with id:", id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  
  
  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd}>
      <TaskLine
  taskLineName="Pending"
  tasks={tasks.filter((task) => task.status === TaskStatus.Pending)}
  onCreateTask={handleOpenModal}
  onDeleteTask={handleDeleteTask}
  onEditTask={handleEditTask}
/>
<TaskLine
  taskLineName="In Progress"
  tasks={tasks.filter((task) => task.status === TaskStatus.InProgress)}
  onDeleteTask={handleDeleteTask}
  onEditTask={handleEditTask}
/>
<TaskLine
  taskLineName="Done"
  tasks={tasks.filter((task) => task.status === TaskStatus.Done)}
  onDeleteTask={handleDeleteTask}
  onEditTask={handleEditTask}
/>

      </DndContext>
      <TaskModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  onSave={handleSaveTask}
  task={selectedTask}
/>

    </div>
  );
}

export default App;
