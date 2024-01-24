import React, { FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TasksModel } from '../../api/tasks/model';

interface Props {
  tasks?: TasksModel[];
  onDateSelect?: (date: string) => void;
}

export const Calendar: FC<Props> = ({ tasks, onDateSelect }) => {
  const events = tasks?.map(task => ({
    title: task.title,
    start: task.dueDate,
  }));

  return (
    <div style={{ minHeight: '500px', minWidth: '600px' }}>
      <FullCalendar
        selectable
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectAllow={(selectInfo) => {
          const selectedStartDate = selectInfo.startStr;

          if (onDateSelect) {
            onDateSelect(selectedStartDate);
          }

          return true;
        }}
      />
    </div>
  );
};
