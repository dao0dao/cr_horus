import { Component } from '@angular/core';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tasks = tasksMocks;
  commonStrings = commonStrings;

  filters = { name: '', date: '', status: '' };
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

  filteredTasks(): Task[] {
    return this.tasks.filter((task) => {
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
  }

  toggleTaskStatus(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      switch (task.status) {
        case 'Completed':
          task.status = 'Pending';
          break;
        case 'Pending':
          task.status = 'Planned';
          break;
        case 'Planned':
          task.status = 'Completed';
          break;
      }
    }
  }

  toggleDescription(task: Task): void {
    task.showDescription = !task.showDescription;
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
      status: 'Planned',
      date,
      description: description || '',
      showDescription: false,
    };

    this.tasks.push(newTask);
    this.closeModal();
  }

  private getLastTaskId(): number {
    let id = 0;
    return this.tasks.reduce((maxId, task) => {
      return task.id > maxId ? task.id : maxId;
    }, id);
  }
}
