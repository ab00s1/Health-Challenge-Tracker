import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-workout-input',
  imports: [],
  templateUrl: './workout-input.component.html',
  styleUrl: './workout-input.component.css'
})
export class WorkoutInputComponent {

  constructor(private router: Router, private workoutService: WorkoutService) { }

  handleSubmit(event: Event) {
    event.preventDefault()
    // console.log(event);

    // Get form data from the event
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('userName') as string;
    const workoutType = formData.get('workoutType') as string;
    const workoutMinutes = Number(formData.get('workoutMinutes'));

    if (workoutMinutes < 0) {
      alert('Please enter a non-negative workout minutes.');
      return;
    }

    // console.log(workoutMinutes);
    const existingUser = this.workoutService.userData.find(user => user.name.toLowerCase() === name.toLowerCase());

    if (existingUser) {
      const existingWorkout = existingUser.workouts.find(work => work.type == workoutType);
      if (existingWorkout) {
        existingUser.workouts = existingUser.workouts.map((work) =>
          work.type === existingWorkout.type ? { ...work, minutes: workoutMinutes } : work
        );
        // console.log(existingWorkout);
      }
      else {
        existingUser.workouts.push({ type: workoutType, minutes: workoutMinutes });
      }

      this.workoutService.addExistingUser(existingUser)
    } else {
      const newUser = {
        id: Date.now(),
        name: name,
        workouts: [{ type: workoutType, minutes: workoutMinutes }]
      };
      // console.log(newUser);
      this.workoutService.addUserData(newUser)
    }

    this.router.navigate(['/workoutList']);
  }
}
