import { Task } from '../models/task.model';

export const tasksMocks: Task[] = [
  {
    id: 1,
    name: 'Zrobić zakupy spożywcze',
    status: 'completed',
    date: '2025-05-01',
    description: 'Muszę kupić mleko, mąkę i jajka.',
    showDescription: false,
  },
  {
    id: 2,
    name: 'Opłacić rachunki',
    status: 'pending',
    date: '2025-05-10',
    description: 'Tylko nie odkładaj tego na inny dzień!',
    showDescription: false,
  },
  {
    id: 3,
    name: 'Urodziny mamy',
    status: 'planned',
    date: '2025-05-15',
    description: 'Kupić kwiaty i tort.',
    showDescription: false,
  },
  {
    id: 4,
    name: 'Urodziny taty',
    status: 'planned',
    date: '2025-05-16',
    description: 'Kupić procenty.',
    showDescription: false,
  },
];
