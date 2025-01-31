import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-workout-list',
  imports: [CommonModule],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent {

  userData: any[] = [];

  constructor(private router: Router, private workoutService: WorkoutService) {
    this.userData = this.workoutService.getUserData();
  }

  searchQuery: string = '';
  filterOption: string = '';
  currentPage = 1;
  recordsPerPage = 5;

  handleSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.currentPage = 1;
  }

  handleFilter(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterOption = selectElement.value === "All" ? '' : selectElement.value;
    this.currentPage = 1;
  }

  get paginatedData() {

    let filteredData = this.userData.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.filterOption) {
      filteredData = filteredData.filter(user =>
        user.workouts.some((w: { type: any; }) => w.type.toLowerCase() === this.filterOption.toLowerCase())
      );
    }

    const start = (this.currentPage - 1) * this.recordsPerPage;
    const end = start + this.recordsPerPage;
    // console.log(filteredData);
    return filteredData.slice(start, end);
  }

  get totalPages() {
    let filteredData = this.userData.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery)
    );

    if (this.filterOption) {
      filteredData = filteredData.filter(user =>
        user.workouts.some((w: { type: any; }) => w.type.toLowerCase() === this.filterOption.toLowerCase())
      );
    }

    return Math.ceil(filteredData.length / this.recordsPerPage);
  }

  getTotalMinutes(user: any): number {
    return user.workouts.reduce((sum: number, w: any) => sum + w.minutes, 0);
  }

  getWorkoutTypes(user: any): string {
    return user.workouts.map((w: { type: any; }) => w.type).join(', ');
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  navigate(searchQuery: string ) {

    // console.log(searchQuery);

    if (searchQuery) {
      this.router.navigate(['/workoutList/workoutProgress'], { queryParams: { name: searchQuery } });
    } else {
      this.router.navigate(['/workoutList/workoutProgress']);
    }
  }
}
