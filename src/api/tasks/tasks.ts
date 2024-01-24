import { api } from '../api';
import { TasksModel, UpdatedTaskModel } from './model';

export const tasksApi = {
  getAllTasks: async () => {
    const response = await api.get<TasksModel[]>('/tasks');

    return response.data;
  },

  createTask: async (newTask: TasksModel) => {
    const response = await api.post<TasksModel>('/tasks', newTask);

    return response.data;
  },

  updateTask: async (taskId: string, updatedTask: UpdatedTaskModel) => {
    const response = await api.put<UpdatedTaskModel>(`/tasks/${taskId}`, updatedTask);

    return response.data;
  },

  deleteTask: async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
  },
};
