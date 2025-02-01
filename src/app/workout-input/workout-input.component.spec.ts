import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutInputComponent } from './workout-input.component';  // Standalone component
import { WorkoutService } from '../services/workout.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('WorkoutInputComponent', () => {
  let component: WorkoutInputComponent;
  let fixture: ComponentFixture<WorkoutInputComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mocking the WorkoutService and Router
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['addUserData', 'addExistingUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Setting up TestBed with the standalone component imported
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, WorkoutInputComponent],  // Import the standalone component here
      providers: [
        { provide: WorkoutService, useValue: mockWorkoutService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form submission for existing user and update workout minutes', () => {
    const form = fixture.debugElement.nativeElement.querySelector('form');

    // Mock data for an existing user
    mockWorkoutService.userData = [
      { id: 1, name: 'Ramesh Musk', workouts: [{ type: 'Running', minutes: 30 }] }
    ];

    // Simulate form input values
    const nameInput = fixture.debugElement.nativeElement.querySelector('input[name="userName"]');
    nameInput.value = 'Ramesh Musk';
    nameInput.dispatchEvent(new Event('input'));          // Dispatch input event

    const workoutTypeInput = fixture.debugElement.nativeElement.querySelector('select[name="workoutType"]');
    workoutTypeInput.value = 'Running';
    workoutTypeInput.dispatchEvent(new Event('change'));  // Dispatch change event

    const workoutMinutesInput = fixture.debugElement.nativeElement.querySelector('input[name="workoutMinutes"]');
    workoutMinutesInput.value = '45';
    workoutMinutesInput.dispatchEvent(new Event('input')); // Dispatch input event

    // Trigger form submission
    form.dispatchEvent(new Event('submit'));

    // Ensure addExistingUser was called with updated workout minutes
    expect(mockWorkoutService.addExistingUser).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'Ramesh Musk',
      workouts: [{ type: 'Running', minutes: 45 }]
    }));

    // Ensure navigation to workout list
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/workoutList']);
  });

  it('should handle form submission for new user and add to workout service', () => {
    const form = fixture.debugElement.nativeElement.querySelector('form');

    // Simulate form input values for a new user
    const nameInput = fixture.debugElement.nativeElement.querySelector('input[name="userName"]');
    nameInput.value = 'New User';
    nameInput.dispatchEvent(new Event('input'));

    const workoutTypeInput = fixture.debugElement.nativeElement.querySelector('select[name="workoutType"]');
    workoutTypeInput.value = 'Yoga';
    workoutTypeInput.dispatchEvent(new Event('change'));

    const workoutMinutesInput = fixture.debugElement.nativeElement.querySelector('input[name="workoutMinutes"]');
    workoutMinutesInput.value = '60';
    workoutMinutesInput.dispatchEvent(new Event('input'));

    // Trigger form submission
    form.dispatchEvent(new Event('submit'));

  });

  it('should show an alert for negative workout minutes', () => {
    spyOn(window, 'alert');  // Mocking the alert function

    const form = fixture.debugElement.nativeElement.querySelector('form');

    // Simulate the form input values with negative minutes
    const nameInput = fixture.debugElement.nativeElement.querySelector('input[name="userName"]');
    nameInput.value = 'Ramesh Musk';
    nameInput.dispatchEvent(new Event('input'));

    const workoutTypeInput = fixture.debugElement.nativeElement.querySelector('select[name="workoutType"]');
    workoutTypeInput.value = 'Cycling';
    workoutTypeInput.dispatchEvent(new Event('change'));

    const workoutMinutesInput = fixture.debugElement.nativeElement.querySelector('input[name="workoutMinutes"]');
    workoutMinutesInput.value = '-10';  // Negative value
    workoutMinutesInput.dispatchEvent(new Event('input'));

    // Trigger form submit
    form.dispatchEvent(new Event('submit'));

    // Ensure alert is triggered for negative workout minutes
    expect(window.alert).toHaveBeenCalledWith('Please enter a non-negative workout minutes.');
  });
});
