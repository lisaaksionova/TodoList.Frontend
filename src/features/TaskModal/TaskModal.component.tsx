import React, { useEffect, useState } from "react";
import "./TaskModal.styles.scss";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Task } from "../../models/Task";
import { TaskStatus } from "../../models/TaskStatus";
import { toJS } from "mobx";

const TaskModal = () => {
  const { taskStore } = useStore();

  const selectedTask = taskStore.selectedTask;

  const [title, setTitle] = useState(selectedTask?.title || "");
  const [text, setText] = useState(selectedTask?.text || "");

  const maxTitleLength = 50;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const trimmedValue = e.target.value.trimStart();
    if (trimmedValue.length <= maxTitleLength) {
      setTitle(e.target.value);
    }
  };

  const maxTextLength = 100;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const trimmedValue = e.target.value.trimStart();
    if (trimmedValue.length <= maxTextLength) {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setText(selectedTask.text);
    }
  }, [selectedTask]);

  if (!taskStore.isModalOpen) return null;

  const handleSave = () => {
    console.log("modal title: ", title);
    console.log("modal text: ", text);

    const task: Task = selectedTask
      ? {
          id: selectedTask.id,
          title: title,
          text: text,
          taskType: selectedTask.taskType,
        }
      : { id: 0, title: title, text: text, taskType: TaskStatus.Pending };
    console.log("update task: ", toJS(task));
    if (title.trim()) {
      taskStore.saveTask(task);
      setTitle("");
      setText("");
      taskStore.closeModal();
    } else {
      alert("Task title is required!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <form className="edit-section">
          <input
            type="text"
            placeholder="Input task title..."
            value={title}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            placeholder="Input task text..."
            value={text}
            onChange={handleTextChange}
          />
        </form>
        <div className="footer">
          <button className="button" onClick={taskStore.closeModal}>
            Close
          </button>
          <button className="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(TaskModal);
