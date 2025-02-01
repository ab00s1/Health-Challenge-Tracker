import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutProgressComponent } from './workout-progress.component';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../services/workout.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('WorkoutProgressComponent', () => {
  let component: WorkoutProgressComponent;
  let fixture: ComponentFixture<WorkoutProgressComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    // Mock WorkoutService
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getUserData']);

    // Mock user data returned by the service
    mockWorkoutService.getUserData.and.returnValue([
      { id: 1, name: 'Ramesh Musk', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
      { id: 2, name: 'Suresh Altman', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] }
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, WorkoutProgressComponent], // Import the standalone component here
      providers: [
        { provide: WorkoutService, useValue: mockWorkoutService },  // Provide mock WorkoutService
        { provide: ActivatedRoute, useValue: { queryParams: of({ name: 'Ramesh Musk' }) } } // Provide mock ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data from WorkoutService', () => {
    expect(component.userData.length).toBe(2);  // Expect 2 users from mock data
  });

  it('should filter user based on query parameter', () => {
    expect(component.selectedUser.name).toBe('Ramesh Musk');  // Should select 'Ramesh Musk'
  });

  it('should correctly calculate total workout minutes', () => {
    expect(component.totalMinutes).toBe(75);  // 30 + 45 from 'Ramesh Musk' workouts
  });

  it('should select a different user and update total minutes', () => {
    component.selectUser({ id: 2, name: 'Suresh Altman', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] });
    expect(component.selectedUser.name).toBe('Suresh Altman');
    expect(component.totalMinutes).toBe(80);  // 60 + 20
  });
});
