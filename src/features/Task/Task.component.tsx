import React from 'react';
import './Task.styles.scss';
import { Task as TaskType } from '../../models/Task';
import { useDraggable } from '@dnd-kit/core';
import { TaskStatus } from '../../models/TaskStatus';
import { stat } from 'fs/promises';

interface Props {
  id: number;
  title: string;
  text: string;
  status: TaskStatus;
  deleteTask: () => void; // Function to delete the task
  onEdit: () => void; // Function to edit the task
};


const Task= ({ id, title, text, status, deleteTask, onEdit } : Props) => {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({id: id});

  const style = transform ? {
    position: 'absolute' as 'absolute', 
    zIndex: '1000',
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  } : undefined;  

  // const headerColor = status === TaskStatus.Pending ? "#5c3c92" : 
  // status === TaskStatus.InProgress ? "#ff6e40" : "#c4a35a";

  return (
    <div  className='task-card'
    style={style}>
      <div className="task-header" ref={setNodeRef} {...listeners} {...attributes}
      // style={
      //   {backgroundColor: headerColor}
      // }
      >
        <h3>{title}</h3>
      </div>
      <div className="task-textarea" ref={setNodeRef} {...listeners} {...attributes}>
        <p className='task-text'>{text} </p>
      </div>
      <div className="task-footer">
        <button type="submit" className='button' onClick={onEdit}>Edit</button>
        <button type="submit" className='button' onClick={deleteTask}>Delete</button>
      </div>
    </div>
  )
}

export default Task;