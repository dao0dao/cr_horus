import { Task } from './task.model';

export interface TaskStatusUpdate {
  id: number;
  status: Task['status'];
}
