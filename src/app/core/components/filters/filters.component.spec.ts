import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { Task } from '../../models/task.model';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty filters', () => {
    expect(component.filters).toEqual({ name: '', date: '', status: '' });
  });

  describe('filter()', () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        name: 'Task 1',
        date: '2025-11-04',
        status: 'completed',
        description: '',
        showDescription: false,
      },
      {
        id: 2,
        name: 'Task 2',
        date: '2025-11-05',
        status: 'pending',
        description: '',
        showDescription: false,
      },
      {
        id: 3,
        name: 'Task 2',
        date: '2025-11-06',
        status: 'planned',
        description: '',
        showDescription: false,
      },
      {
        id: 4,
        name: 'Task 4',
        date: '2025-11-06',
        status: 'planned',
        description: '',
        showDescription: false,
      },
    ];

    beforeEach(() => {
      (component as any).tasks = () => mockTasks;
    });

    it('should filter tasks by name case-insensitively', () => {
      const spy = spyOn(component.filteredTasks, 'emit');
      component.filters.name = 'TASK';

      component.filter();

      expect(spy).toHaveBeenCalledWith([mockTasks[0], mockTasks[1], mockTasks[2], mockTasks[3]]);
    });

    it('should filter tasks by date', () => {
      const spy = spyOn(component.filteredTasks, 'emit');
      component.filters.date = '2025-11-06';

      component.filter();

      expect(spy).toHaveBeenCalledWith([mockTasks[2], mockTasks[3]]);
    });

    it('should filter tasks by status', () => {
      const spy = spyOn(component.filteredTasks, 'emit');
      component.filters.status = 'completed';

      component.filter();

      expect(spy).toHaveBeenCalledWith([mockTasks[0]]);
    });

    it('should combine multiple filters', () => {
      const spy = spyOn(component.filteredTasks, 'emit');
      component.filters.name = 'task';
      component.filters.date = '2025-11-06';
      component.filters.status = 'planned';

      component.filter();

      expect(spy).toHaveBeenCalledWith([mockTasks[2], mockTasks[3]]);
    });

    it('should return all tasks when filters are empty', () => {
      const spy = spyOn(component.filteredTasks, 'emit');

      component.filter();

      expect(spy).toHaveBeenCalledWith(mockTasks);
    });

    it('should return empty array when no tasks match filters', () => {
      const spy = spyOn(component.filteredTasks, 'emit');
      component.filters.name = 'nonexistent';

      component.filter();

      expect(spy).toHaveBeenCalledWith([]);
    });
  });
});
