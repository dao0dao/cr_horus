import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Task } from '../../models/task.model';
import { commonStrings } from '../../strings/common.strings';
import { futureDateValidator } from '../../utils/validators/future-date.validator';

@Component({
  selector: 'app-add-task-modal',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
  standalone: true,
})
export class AddTaskModalComponent {
  lastTaskId = input<number>(0);
  addNewTask = output<Task | void>();

  commonStrings = commonStrings;

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      date: ['', [Validators.required, futureDateValidator]],
      description: ['', Validators.maxLength(300)],
    });
  }

  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  addTask(): void {
    if (this.taskForm.invalid) return;

    const name = this.taskForm.get('name')?.value;
    const date = this.taskForm.get('date')?.value;
    const description = this.taskForm.get('description')?.value;

    const newTask: Task = {
      id: this.lastTaskId() + 1,
      name,
      status: 'planned',
      date,
      description: description || '',
      showDescription: false,
    };

    this.addNewTask.emit(newTask);
  }

  closeModal(): void {
    this.addNewTask.emit();
  }

  getControlByName(controlName: string) {
    return this.taskForm.get(controlName);
  }
}
