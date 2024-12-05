import "./App.css";
import TaskLine from "./features/TaskLine/TaskLine.component";
import TaskModal from "./features/TaskModal/TaskModal.component";
import { TaskStatus } from "./models/TaskStatus";
import { Task } from "./models/Task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";

function App() {
  const { taskStore } = useStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as Task["status"];

    taskStore.tasks = taskStore.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: newStatus,
          }
        : task
    );
  }

  return (
    <Flex className="App" vertical={true} justify="space-between">
      <DndContext onDragEnd={handleDragEnd}>
        <TaskLine
          taskLineName="Pending"
          tasks={taskStore.tasks.filter(
            (task) => task.status === TaskStatus.Pending
          )}
        />
        <TaskLine
          taskLineName="In Progress"
          tasks={taskStore.tasks.filter(
            (task) => task.status === TaskStatus.InProgress
          )}
        />
        <TaskLine
          taskLineName="Done"
          tasks={taskStore.tasks.filter(
            (task) => task.status === TaskStatus.Done
          )}
        />
      </DndContext>
      <TaskModal />
    </Flex>
  );
}

export default observer(App);
