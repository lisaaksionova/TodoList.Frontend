import React from 'react';
import './TaskLine.styles.scss';
import Task from '../Task/Task.component';
import CreateTask from '../CreateTask/CreateTask.component';
import { TaskStatus } from '../../models/TaskStatus';
import { Task as TaskType } from '../../models/Task';
import { useDroppable } from '@dnd-kit/core';

type Props = {
  taskLineName: string;
  tasks: TaskType[];
  onCreateTask?: () => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (task: TaskType) => void;
}

const TaskLine = ({ taskLineName, tasks, onCreateTask, onDeleteTask, onEditTask} : Props) => {

  const backgroundColor = 
  taskLineName === "Pending" ? "#077b8a" : 
  taskLineName === "In Progress" ? "#e0a96d" : "#77c593" ;

  const { setNodeRef } = useDroppable({id: taskLineName});

  return (
      
    <div ref={setNodeRef} className='tasklist-container' style={{ backgroundColor }}>
      <h3 className='tasklist-name'>{taskLineName}</h3>
       <div  className='taskline'>
       {tasks.map((task) => (
         <Task
         key={task.id}
         {...task}
         deleteTask={() => onDeleteTask(task.id)}
         onEdit={() => onEditTask(task)}
       />
        ))}
        {taskLineName === "Pending" && onCreateTask && (
          <CreateTask onOpenModal={onCreateTask} />
        )}
      </div>
    </div>
    
    
  )
}
export default TaskLine;