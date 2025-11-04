import { Component, signal, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { Task } from './core/models/task.model';
import { tasksMocks } from './core/mocks/tasks.mocks';
import { commonStrings } from './core/strings/common.strings';
import { FiltersComponent } from './core/shared/filters/filters.component';
import { TaskListComponent } from './core/shared/task-list/task-list.component';
import { TaskStatusUpdate } from './core/models/task-status-update.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FiltersComponent,
    TaskListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  allTasks: WritableSignal<Task[]> = signal(tasksMocks);

  filteredTasks: WritableSignal<Task[]> = signal(tasksMocks);

  commonStrings = commonStrings;

  isModalOpen = false;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', [Validators.required, this.futureDateValidator]],
      description: [''],
    });
  }

  private futureDateValidator(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (control.value && selectedDate < today) {
      return { pastDate: true };
    }
    return null;
  }

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
    this.taskForm.reset();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addTask(): void {
    if (this.taskForm.invalid) return;

    const name = this.taskForm.get('name')?.value;
    const date = this.taskForm.get('date')?.value;
    const description = this.taskForm.get('description')?.value;

    const newTask: Task = {
      id: this.getLastTaskId() + 1,
      name,
      status: 'planned',
      date,
      description: description || '',
      showDescription: false,
    };

    this.allTasks.update((tasks) => [...tasks, newTask]);
    this.closeModal();
  }

  private getLastTaskId(): number {
    let id = 0;
    return this.allTasks().reduce((maxId, task) => {
      return task.id > maxId ? task.id : maxId;
    }, id);
  }
}
