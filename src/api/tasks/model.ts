export interface TasksModel {
  id: string,
  title: string
  description: string
  status: boolean,
  dueDate: string
}

export interface UpdatedTaskModel {
  title: string
  description: string
  status: boolean,
  dueDate: string
}
