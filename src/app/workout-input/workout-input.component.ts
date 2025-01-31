import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-input',
  imports: [],
  templateUrl: './workout-input.component.html',
  styleUrl: './workout-input.component.css'
})
export class WorkoutInputComponent {
  constructor (private router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault()
    console.log("Form Submitted");

    this.router.navigate(['/workoutList']);
  }
}
