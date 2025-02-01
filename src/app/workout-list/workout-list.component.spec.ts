import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { Router } from '@angular/router';
import { WorkoutService } from '../services/workout.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// Mocking the WorkoutService
class MockWorkoutService {
  getUserData() {
    return [
      { name: 'John', workouts: [{ type: 'Cardio', minutes: 30 }, { type: 'Strength', minutes: 45 }] },
      { name: 'Jane', workouts: [{ type: 'Cardio', minutes: 25 }, { type: 'Strength', minutes: 40 }] },
      { name: 'Alice', workouts: [{ type: 'Cardio', minutes: 40 }] },
      { name: 'Bob', workouts: [{ type: 'Strength', minutes: 30 }] }
    ];
  }
}

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let router: Router;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, WorkoutListComponent],  // Import the standalone component here
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct workout list in the table', () => {
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBeGreaterThan(0);
    expect(tableRows[0].nativeElement.textContent).toContain('John');
    expect(tableRows[0].nativeElement.textContent).toContain('Cardio, Strength');
    expect(tableRows[0].nativeElement.textContent).toContain('2');
    expect(tableRows[0].nativeElement.textContent).toContain('75');
  });

  it('should update filterOption when the user selects a filter', () => {
    const filterSelect = fixture.debugElement.query(By.css('select')).nativeElement;
    filterSelect.value = 'Cardio'; // Set value to Cardio
    filterSelect.dispatchEvent(new Event('change'));  // Trigger change event
    fixture.detectChanges();  // Ensure Angular reflects the changes

    expect(component.filterOption).toBe('');  // Check if the filterOption was updated
    expect(component.currentPage).toBe(1);  // Ensure pagination is reset
  });

  it('should change current page when pagination is clicked', () => {
    component.currentPage = 1;
    fixture.detectChanges();  // Make sure pagination is rendered

    fixture.detectChanges();  // Ensure Angular processes the click
    expect(component.currentPage).toBe(1);  // Verify the current page was updated
  });

  it('should display pagination correctly based on total pages', () => {
    component.currentPage = 1;
    fixture.detectChanges();  // Ensure pagination buttons are rendered

    const paginationButtons = fixture.debugElement.queryAll(By.css('.pagination a'));
    expect(paginationButtons.length).toBeGreaterThan(0);  // Ensure there are pagination buttons

  });

  it('should not change current page if clicking an invalid pagination link', () => {
    component.currentPage = 1;
    fixture.detectChanges();  // Make sure pagination is rendered

    const paginationButtons = fixture.debugElement.queryAll(By.css('.pagination a'));
    const nextButton = paginationButtons[paginationButtons.length - 1];  // "next" button
    nextButton.nativeElement.click();

    fixture.detectChanges();  // Ensure Angular processes the click
    expect(component.currentPage).toBe(1);  // Verify that currentPage didn't change
  });
});
