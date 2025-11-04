import { Component, effect, input, output } from '@angular/core';
import { commonStrings } from '../../strings/common.strings';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-filters',
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  standalone: true,
})
export class FiltersComponent {
  tasks = input([], {
    transform: (tasks: Task[]) => {
      this.filter(tasks);
      return tasks;
    },
  });
  filteredTasks = output<Task[]>();

  commonStrings = commonStrings;

  filters = { name: '', date: '', status: '' };

  constructor() {}

  filter(tasks?: Task[]): void {
    const tasksToFilter = tasks || this.tasks();
    const filteredTasks = tasksToFilter.filter((task) => {
      const matchesName = task.name
        .toLowerCase()
        .includes(this.filters.name.toLowerCase());

      const matchesDate = this.filters.date
        ? task.date === this.filters.date
        : true;

      const matchesStatus = this.filters.status
        ? task.status === this.filters.status
        : true;

      return matchesName && matchesDate && matchesStatus;
    });

    this.filteredTasks.emit(filteredTasks);
  }
}
