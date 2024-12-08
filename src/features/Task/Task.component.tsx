import "./Task.styles.scss";
import { Task as TaskType } from "../../models/Task";
import { useDraggable } from "@dnd-kit/core";
import Card from "antd/es/card/Card";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

interface Props {
  task: TaskType;
}

const Task = ({ task }: Props) => {
  const { taskStore } = useStore();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        zIndex: 1000,
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Card
      title={task.title}
      className="task-card"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      bodyStyle={{ padding: 0 }}
    >
      <div
        className="card-body"
        onPointerDown={(event) => {
          const target = event.target as HTMLElement;

          if (target.tagName === "BUTTON" || target.closest("[data-no-drag]")) {
            event.stopPropagation();
          }
        }}
      >
        <p className="task-text">{task.text} </p>
        <div className="buttons">
          <Button
            data-no-drag
            onClick={() => {
              taskStore.editTask(task);
            }}
          >
            Edit
          </Button>
          <Button
            data-no-drag
            danger={true}
            onClick={() => {
              taskStore.deleteTask(task.id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default observer(Task);
