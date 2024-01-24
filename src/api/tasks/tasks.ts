import { api } from '../api';
import { TasksModel, UpdatedTaskModel, UpdatedTaskStatusModel } from './model';

const simulateDelay = (ms: number) => new Promise(resolve => {
  setTimeout(resolve, ms);
});

export const tasksApi = {
  getAllTasks: async () => {
    const response = await api.get<TasksModel[]>('/tasks');

    return response.data;
  },

  createTask: async (newTask: TasksModel) => {
    await simulateDelay(1000);
    const response = await api.post<TasksModel>('/tasks', newTask);

    return response.data;
  },

  updateTask: async (taskId: string, updatedTask: UpdatedTaskModel) => {
    await simulateDelay(1000);
    const response = await api.put<UpdatedTaskModel>(`/tasks/${taskId}`, updatedTask);

    return response.data;
  },

  updateStatus: async (
    taskId: string,
    updatedTaskStatus: UpdatedTaskStatusModel,
  ) => {
    await simulateDelay(1000);
    const response = await api.put<UpdatedTaskStatusModel>(`/tasks/${taskId}`, updatedTaskStatus);

    return response.data;
  },

  deleteTask: async (taskId: string) => {
    await simulateDelay(1000);
    await api.delete(`/tasks/${taskId}`);
  },
};
