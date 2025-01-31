import { Component } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-progress',
  imports: [CommonModule],
  templateUrl: './workout-progress.component.html',
  styleUrl: './workout-progress.component.css'
})
export class WorkoutProgressComponent {

  userData: any[] = [];
  selectedUser: any;
  totalMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {
    this.userData = this.workoutService.getUserData();
    this.selectedUser = this.userData[0];                 // Default to first user
    this.calculateTotalMinutes();
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

  calculateTotalMinutes() {
    this.totalMinutes = this.userData.filter((data) => data == this.selectedUser).reduce(
      (sum, user) => sum + user.workouts.reduce((wSum: any, w: { minutes: any; }) => wSum + w.minutes, 0),
      0
    );
  }
}
