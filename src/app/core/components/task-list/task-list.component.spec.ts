import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Task } from '../../models/task.model';
import { TaskStatusUpdate } from '../../models/task-status-update.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleTaskStatus()', () => {
    let mockTasks: Task[];

    beforeEach(() => {
      mockTasks = [
        {
          id: 1,
          name: 'A',
          date: '2025-11-04',
          status: 'completed',
          description: '',
          showDescription: false,
        },
        {
          id: 2,
          name: 'B',
          date: '2025-11-05',
          status: 'pending',
          description: '',
          showDescription: false,
        },
        {
          id: 3,
          name: 'C',
          date: '2025-11-06',
          status: 'planned',
          description: '',
          showDescription: false,
        },
      ];

      (component as any).tasks = () => mockTasks;
    });

    it('should change completed status to pending and emit update', () => {
      const spy = spyOn(component.tasksStatusUpdate, 'emit');
      component.toggleTaskStatus(1);

      expect(mockTasks[0].status).toBe('pending');
      expect(spy).toHaveBeenCalledWith({
        id: 1,
        status: 'pending',
      } as TaskStatusUpdate);
    });

    it('should change pending status to planned and emit update', () => {
      const spy = spyOn(component.tasksStatusUpdate, 'emit');
      component.toggleTaskStatus(2);

      expect(mockTasks[1].status).toBe('planned');
      expect(spy).toHaveBeenCalledWith({
        id: 2,
        status: 'planned',
      } as TaskStatusUpdate);
    });

    it('should change planned status to completed and emit update', () => {
      const spy = spyOn(component.tasksStatusUpdate, 'emit');
      component.toggleTaskStatus(3);

      expect(mockTasks[2].status).toBe('completed');
      expect(spy).toHaveBeenCalledWith({
        id: 3,
        status: 'completed',
      } as TaskStatusUpdate);
    });

    it('should not emit when task id does not exist', () => {
      const spy = spyOn(component.tasksStatusUpdate, 'emit');
      component.toggleTaskStatus(0);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('toggleDescription()', () => {
    it('should stop propagation and set showDescription to true', () => {
      const task: Task = {
        id: 1,
        name: 'A',
        date: '2025-11-04',
        status: 'planned',
        description: '',
        showDescription: false,
      };
      const stopSpy = jasmine.createSpy('stopPropagation');
      const fakeEvent = { stopPropagation: stopSpy } as unknown as Event;

      component.toggleDescription(fakeEvent, task);

      expect(stopSpy).toHaveBeenCalled();
      expect(task.showDescription).toBeTrue();
    });

    it('should stop propagation and set showDescription to false', () => {
      const task: Task = {
        id: 1,
        name: 'A',
        date: '2025-11-04',
        status: 'planned',
        description: '',
        showDescription: true,
      };
      const stopSpy = jasmine.createSpy('stopPropagation');
      const fakeEvent = { stopPropagation: stopSpy } as unknown as Event;

      component.toggleDescription(fakeEvent, task);

      expect(stopSpy).toHaveBeenCalled();
      expect(task.showDescription).toBeFalse();
    });
  });
});
