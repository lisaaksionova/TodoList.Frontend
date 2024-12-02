import React from 'react';
import './CreateTask.styles.scss';

type Props = {
  onOpenModal: () => void;
};


const CreateTask = ({ onOpenModal }: Props) => {
  return (
    <div className="createtask-card" onClick={onOpenModal}>
      <p>+</p>
    </div>
  );
};

export default CreateTask;
