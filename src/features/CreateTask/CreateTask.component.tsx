import "./CreateTask.styles.scss";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const CreateTask = () => {
  const { taskStore } = useStore();

  return (
    <div className="createtask-card" onClick={taskStore.openModal}>
      <p>+</p>
    </div>
  );
};

export default observer(CreateTask);
