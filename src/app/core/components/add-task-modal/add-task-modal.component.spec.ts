import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AddTaskModalComponent } from './add-task-modal.component';
import { commonStrings } from '../../strings/common.strings';

describe('AddTaskModalComponent', () => {
  let component: AddTaskModalComponent;
  let fixture: ComponentFixture<AddTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskModalComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    describe('Invalid Form States', () => {
      it('should initialize with invalid form', () => {
        expect(component.taskForm.valid).toBeFalse();
      });

      it('should mark name field as invalid when empty', () => {
        const nameControl = component.taskForm.controls['name'];
        nameControl.setValue('');
        expect(nameControl.valid).toBeFalse();
        expect(nameControl.errors?.['required']).toBeTruthy();
      });

      it('should mark name field as invalid when length is more than 30', () => {
        const nameControl = component.taskForm.controls['name'];
        nameControl.setValue('A'.repeat(31));
        expect(nameControl.valid).toBeFalse();
        expect(nameControl.errors?.['maxlength']).toBeTruthy();
      });

      it('should mark date field as invalid when empty', () => {
        const dateControl = component.taskForm.controls['date'];
        expect(dateControl.valid).toBeFalse();
        expect(dateControl.errors?.['required']).toBeTruthy();
      });

      it('should mark date field as invalid when past date is set', () => {
        const dateControl = component.taskForm.controls['date'];
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        dateControl.setValue(pastDate.toISOString().split('T')[0]);
        expect(dateControl.errors?.['pastDate']).toBeTruthy();
      });

      it('should mark description field as invalid when length is more than 300', () => {
        const descriptionControl = component.taskForm.controls['description'];
        descriptionControl.setValue('A'.repeat(301));
        expect(descriptionControl.errors?.['maxlength']).toBeTruthy();
      });
    });

    describe('Valid Form States', () => {
      it('should mark name field as valid when filled correctly', () => {
        const nameControl = component.taskForm.controls['name'];
        nameControl.setValue('Test Task');
        expect(nameControl.valid).toBeTrue();
        expect(nameControl.errors).toBeNull();
      });

      it('should mark name field as valid when length is less than or equal 30', () => {
        const nameControl = component.taskForm.controls['name'];
        nameControl.setValue('A'.repeat(30));
        expect(nameControl.valid).toBeTrue();
        expect(nameControl.errors?.['maxlength']).toBeFalsy();
      });

      it('should mark date field as valid when future date is set', () => {
        const dateControl = component.taskForm.controls['date'];
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        dateControl.setValue(futureDate.toISOString().split('T')[0]);
        expect(dateControl.valid).toBeTrue();
        expect(dateControl.errors).toBeNull();
      });

      it('should mark description field as valid when length is less than or equal 300', () => {
        const descriptionControl = component.taskForm.controls['description'];
        descriptionControl.setValue('A'.repeat(300));
        expect(descriptionControl.valid).toBeTrue();
        expect(descriptionControl.errors?.['maxlength']).toBeFalsy();
      });
    });
  });

  describe('Form Submission', () => {
    it('should emit new task when form is valid', () => {
      const spy = spyOn(component.addNewTask, 'emit');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      component.taskForm.patchValue({
        name: 'Test Task',
        date: tomorrowStr,
        description: 'Test Description',
      });

      component.addTask();

      expect(spy).toHaveBeenCalledWith({
        id: component.lastTaskId() + 1,
        name: 'Test Task',
        date: tomorrowStr,
        description: 'Test Description',
        status: 'planned',
        showDescription: false,
      });
    });

    it('should not emit when form is invalid', () => {
      const spy = spyOn(component.addNewTask, 'emit');
      component.addTask();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Modal Actions', () => {
    it('should emit close event when closeModal is called', () => {
      const spy = spyOn(component.addNewTask, 'emit');
      component.closeModal();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith();
    });
  });

  describe('Text Content', () => {
    it('should display correct form labels', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h4').textContent).toContain(
        commonStrings.newTask.title
      );

      const labels = compiled.querySelectorAll('label');
      expect(labels[0].textContent).toContain(
        commonStrings.newTask.form.nameInput.label
      );
      expect(labels[1].textContent).toContain(
        commonStrings.newTask.form.dateInput.label
      );
      expect(labels[2].textContent).toContain(
        commonStrings.newTask.form.descriptionInput.label
      );
    });
  });
});
