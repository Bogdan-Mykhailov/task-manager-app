import React, { ChangeEvent, FC, useState } from 'react';
import { Card } from 'react-bootstrap';
import { MainModal } from '../MainModal/MainModal';
import { tasksApi } from '../../api/tasks/tasks';
import { MainSpinner } from '../MainSpinner/MainSpinner';

interface Props {
  id: string;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
  resetStates?: () => void;
  getAllTAsks: () => void;
}

export const TaskItem: FC<Props> = (
  {
    id,
    title,
    description,
    dueDate,
    getAllTAsks,
    resetStates,
    status,
  },
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskTitleUpdate, setTaskTitleUpdate] = useState('');
  const [taskDescriptionUpdate, setTaskDescriptionUpdate] = useState('');
  const [selectedDueDate, setSelectedDueDate] = useState('');

  const updateTask = async (taskId: string) => {
    try {
      setIsLoading(true);

      const updatedTask = {
        title: taskTitleUpdate || title,
        description: taskDescriptionUpdate || description,
        dueDate: selectedDueDate || dueDate,
      };

      await tasksApi.updateTask(taskId, updatedTask);

      await getAllTAsks();
      setIsLoading(false);
    } catch (error) {
      window.console.log(error);
    }
  };

  const updateTaskStatus = async () => {
    try {
      setIsLoading(true);

      const updatedTaskStatus = {
        title,
        description,
        status: !status,
        dueDate,
      };

      await tasksApi.updateStatus(id, updatedTaskStatus);
      getAllTAsks();
      setIsLoading(false);
    } catch (error) {
      window.console.log(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setIsLoading(true);

      await tasksApi.deleteTask(taskId);
      await getAllTAsks();
      setIsLoading(false);
    } catch (error) {
      window.console.log(error);
    }
  };

  const handleModalTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitleUpdate(e.target.value);
  };

  const handleModalDescriptionChange
    = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTaskDescriptionUpdate(e.target.value);
    };

  const handleModalDueDateChange = (date: string) => {
    setSelectedDueDate(date);
  };

  return (
    <Card style={{
      width: '20rem',
      marginBottom: 10,
      border: status ? '1px dashed red' : '',
      opacity: status ? 0.4 : 1,
    }}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Card.Text style={{ margin: 0 }}>
            {dueDate}
          </Card.Text>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30,
            width: 120,
          }}
          >
            <p style={{ margin: 0 }}>Completed</p>
            {isLoading ? <MainSpinner /> : (
              <input
                type="checkbox"
                checked={status}
                onChange={updateTaskStatus}
              />
            )}
          </div>
        </div>
      </Card.Body>
      <Card.Footer style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <MainModal
          selectedDueDate={selectedDueDate}
          onDateChange={handleModalDueDateChange}
          title={taskTitleUpdate}
          description={taskDescriptionUpdate}
          onDescriptionChange={handleModalDescriptionChange}
          onTitleChange={handleModalTitleChange}
          type="update"
          callBack={() => updateTask(id)}
          resetStates={resetStates}
        />
        <MainModal type="delete" callBack={() => deleteTask(id)} />
      </Card.Footer>
    </Card>
  );
};
