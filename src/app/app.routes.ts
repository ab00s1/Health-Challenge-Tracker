import { Routes } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutInputComponent } from './workout-input/workout-input.component';
import { WorkoutProgressComponent } from './workout-progress/workout-progress.component';

export const routes: Routes = [
    {path: "", component: WorkoutInputComponent},
    {path: "workoutList", component: WorkoutListComponent},
    {path: "workoutList/workoutProgress", component: WorkoutProgressComponent},
];
