export interface Task {
  id: number;
  name: string;
  status: 'Completed' | 'Pending' | 'Planned';
  date: string;
  description: string;
  showDescription?: boolean;
}