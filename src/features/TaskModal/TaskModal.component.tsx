import React, { useEffect, useState } from 'react';
import './TaskModal.styles.scss';
import { Task } from '../../models/Task';

interface Props {
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (task: {id?: number, title: string; text: string }) => void; 
  task: Task | null;
}

const TaskModal = ({ isOpen, onClose, onSave, task }: Props) => {
  const [title, setTitle] = useState(task?.title || ''); // Pre-fill for editing
  const [text, setText] = useState(task?.text || '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setText(task.text);
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim()) {
      onSave({ id: task?.id, title, text });
      setTitle('');
      setText('');
      onClose();
    } else {
      alert("Task title is required!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className='modal-container'>
        <form className='edit-section'>
          <input 
          type="text" 
          placeholder='Input task title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
          <input 
          type="text" 
          placeholder='Input task text...'
          value={text}
          onChange={(e) => setText(e.target.value)}/>
        </form>
        <div className="footer">
          <button className='button' onClick={onClose}>Close</button>
          <button className='button' onClick={handleSave}>Save</button>
        </div>
      </div>
      </div>
  )
}

export default TaskModal;