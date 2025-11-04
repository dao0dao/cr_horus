import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskStatusUpdate } from '../../models/task-status-update.model';
import { commonStrings } from '../../strings/common.strings';

@Component({
  selector: 'app-task-list',
  imports: [NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
})
export class TaskListComponent {
  tasks = input<Task[]>([]);
  tasksStatusUpdate = output<TaskStatusUpdate>();

  commonStrings = commonStrings;

  toggleTaskStatus(taskId: number): void {
    const task = this.tasks().find((task) => task.id === taskId);
    if (task) {
      switch (task.status) {
        case 'completed':
          task.status = 'pending';
          break;
        case 'pending':
          task.status = 'planned';
          break;
        case 'planned':
          task.status = 'completed';
          break;
      }
      return this.tasksStatusUpdate.emit({ id: task.id, status: task.status });
    }
  }

  toggleDescription(event: Event, task: Task): void {
    event.stopPropagation();
    task.showDescription = !task.showDescription;
  }
}
