import React, { useEffect, useState } from "react";
import "./TaskModal.styles.scss";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const TaskModal = () => {
  const { taskStore } = useStore();

  const task = taskStore.selectedTask;

  const [title, setTitle] = useState(task?.title || "");
  const [text, setText] = useState(task?.text || "");

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
    if (task) {
      setTitle(task.title);
      setText(task.text);
    }
  }, [task]);

  if (!taskStore.isModalOpen) return null;

  const handleSave = () => {
    if (title.trim()) {
      taskStore.saveTask({ id: task?.id, title, text });
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
