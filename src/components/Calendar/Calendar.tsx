import React, { FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TasksModel } from '../../api/tasks/model';

interface Props {
  tasks?: TasksModel[];
}

export const Calendar: FC<Props> = ({ tasks }) => {
  const events = tasks?.map(task => ({
    title: task.title,
    start: task.dueDate,
  }));

  return (
    <div style={{ minHeight: '500px', minWidth: '600px' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};
