export type TaskStatus = 'completed' | 'pending' | 'planned';

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  date: string;
  description: string;
  showDescription?: boolean;
}
