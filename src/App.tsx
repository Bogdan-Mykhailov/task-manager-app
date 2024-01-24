import React from 'react';
import s from './App.module.css';
import { TasksList } from './components/TasksList/TasksList';

export const App = () => {
  return (
    <div className={s.app}>
      <TasksList />
    </div>
  );
};
