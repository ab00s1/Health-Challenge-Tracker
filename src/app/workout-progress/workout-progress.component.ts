import { Component } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  searchQuery: string | null = null;

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute) {
    this.userData = this.workoutService.getUserData();
    
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['name'] || null;

      // Filter user data based on searchQuery
      if (this.searchQuery) {
        this.selectedUser = this.userData.filter((user) => user.name === this.searchQuery)[0];
      } else {
        // Default to the first user if no searchQuery
        this.selectedUser = this.userData[0];
      }

      // Calculate total minutes after selecting user
      this.calculateTotalMinutes();
    });
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
