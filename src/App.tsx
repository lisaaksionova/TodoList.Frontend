import "./App.css";
import TaskLine from "./features/TaskLine/TaskLine.component";
import TaskModal from "./features/TaskModal/TaskModal.component";
import { TaskStatus } from "./models/TaskStatus";
import { Task } from "./models/Task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";
import { useEffect } from "react";
import { toJS } from "mobx";

function App() {
  const { taskStore } = useStore();

  useEffect(() => {
    taskStore.loadTasks();
  }, [taskStore]);

  // taskStore.tasks.forEach((task) => console.log(task));

  console.log(toJS(taskStore.tasks));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as Task["taskType"];

    taskStore.tasks = taskStore.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            taskType: newStatus,
          }
        : task
    );
  }

  return (
    <Flex className="App" vertical={true} justify="space-between">
      <DndContext onDragEnd={handleDragEnd}>
        <TaskLine
          taskLineName="Pending"
          tasks={taskStore.tasks.filter((task) => task.taskType === "Pending")}
        />
        <TaskLine
          taskLineName="In Progress"
          tasks={taskStore.tasks.filter(
            (task) => task.taskType === TaskStatus.InProgress
          )}
        />
        <TaskLine
          taskLineName="Done"
          tasks={taskStore.tasks.filter(
            (task) => task.taskType === TaskStatus.Done
          )}
        />
      </DndContext>
      <TaskModal />
    </Flex>
  );
}

export default observer(App);
