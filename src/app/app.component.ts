import { Component, signal, WritableSignal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Task } from './core/models/task.model';
import { commonStrings } from './core/strings/common.strings';
import { FiltersComponent } from './core/components/filters/filters.component';
import { TaskListComponent } from './core/components/task-list/task-list.component';
import { TaskStatusUpdate } from './core/models/task-status-update.model';
import { AddTaskModalComponent } from './core/components/add-task-modal/add-task-modal.component';
import { tasksMocks } from './data/mocks/tasks.mocks';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FiltersComponent,
    TaskListComponent,
    AddTaskModalComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  allTasks: WritableSignal<Task[]> = signal(tasksMocks);

  filteredTasks: WritableSignal<Task[]> = signal(tasksMocks);

  commonStrings = commonStrings;

  isModalOpen = false;

  setFilteredTasks(tasks: Task[]): void {
    this.filteredTasks.set(tasks);
  }

  updateTaskStatus(taskStatusUpdate: TaskStatusUpdate): void {
    this.allTasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskStatusUpdate.id
          ? { ...task, status: taskStatusUpdate.status }
          : task
      )
    );
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  addTask(newTask: Task | void): void {
    if (newTask) {
      this.allTasks.update((tasks) => [...tasks, newTask]);
    }
    this.isModalOpen = false;
  }

  getLastTaskId(): number {
    let id = 0;
    return this.allTasks().reduce((maxId, task) => {
      return task.id > maxId ? task.id : maxId;
    }, id);
  }
}
