import "./TaskLine.styles.scss";
import Task from "../Task/Task.component";
import CreateTask from "../CreateTask/CreateTask.component";
import { Task as TaskType } from "../../models/Task";
import { useDroppable } from "@dnd-kit/core";
import { Flex } from "antd";
import { observer } from "mobx-react-lite";

type Props = {
  taskLineName: string;
  tasks: TaskType[];
};

const TaskLine = ({ taskLineName, tasks }: Props) => {
  const backgroundColor =
    taskLineName === "Pending"
      ? "#077b8a"
      : taskLineName === "In Progress"
      ? "#e0a96d"
      : "#77c593";

  const { setNodeRef } = useDroppable({ id: taskLineName });

  return (
    <Flex
      vertical={true}
      className="tasklist-container"
      ref={setNodeRef}
      style={{ backgroundColor }}
    >
      <h3 className="tasklist-name">{taskLineName}</h3>
      <Flex justify="flex-start" className="taskline">
        {tasks.map((task) => (
          <Task task={task} />
        ))}
        {taskLineName === "Pending" && <CreateTask />}
      </Flex>
    </Flex>
  );
};
export default observer(TaskLine);
