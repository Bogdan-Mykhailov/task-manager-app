import React, { ChangeEvent, useEffect, useState } from 'react';
import { MainSpinner } from '../MainSpinner/MainSpinner';
import { TaskItem } from '../TaskItem/TaskItem';
import { TasksModel } from '../../api/tasks/model';
import { tasksApi } from '../../api/tasks/tasks';
import s from './TasksList.module.css';
import { MainModal } from '../MainModal/MainModal';
import { createId } from '../../utils/helpers';
import { Calendar } from '../Calendar/Calendar';

export const TasksList = () => {
  const [tasks, setTasks] = useState<TasksModel[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [taskTitleCreate, setTaskTitleCreate] = useState('');
  const [taskDescriptionCreate, setTaskDescriptionCreate] = useState('');
  const [selectedDueDate, setSelectedDueDate] = useState('');

  const getAllTAsks = async () => {
    try {
      setIsLoading(true);
      const res = await tasksApi.getAllTasks();

      setTasks(res);
      setIsLoading(false);
    } catch (error) {
      window.console.log(error);
    }
  };

  const resetStates = () => {
    setTaskTitleCreate('');
    setTaskDescriptionCreate('');
    setSelectedDueDate('');
  };

  const createTask = async () => {
    try {
      setIsLoading(true);
      const newTask = {
        id: createId(),
        title: taskTitleCreate,
        description: taskDescriptionCreate,
        status: false,
        dueDate: selectedDueDate,
      };

      await tasksApi.createTask(newTask);

      resetStates();
      await getAllTAsks();
      setIsLoading(false);
    } catch (error) {
      window.console.log(error);
    }
  };

  useEffect(() => {
    getAllTAsks();
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitleCreate(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescriptionCreate(e.target.value);
  };

  const handleModalDueDateChange = (date: string) => {
    setSelectedDueDate(date);
  };

  return (
    <div className={s.listWrapper}>
      <div className={s.list}>
        <h2>Todo List</h2>

        <div style={{ marginBottom: 20 }}>
          <MainModal
            selectedDueDate={selectedDueDate}
            onDateChange={handleModalDueDateChange}
            resetStates={resetStates}
            title={taskTitleCreate}
            description={taskDescriptionCreate}
            type="create"
            callBack={createTask}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
        </div>

        {
          isLoading
            ? <MainSpinner />
            : (
              <>
                {tasks?.map((
                  {
                    id,
                    title,
                    description,
                    dueDate,
                    status,
                  },
                ) => (
                  <TaskItem
                    getAllTAsks={getAllTAsks}
                    status={status}
                    resetStates={resetStates}
                    id={id}
                    key={id}
                    title={title}
                    description={description}
                    dueDate={dueDate}
                  />
                ))}
              </>
            )
        }
      </div>
      <Calendar tasks={tasks} />
    </div>
  );
};
