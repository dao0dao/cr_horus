export interface Task {
  id: number;
  name: string;
  status: 'completed' | 'pending' | 'planned';
  date: string;
  description: string;
  showDescription?: boolean;
}