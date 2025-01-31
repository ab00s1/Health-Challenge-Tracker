import { Routes } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutInputComponent } from './workout-input/workout-input.component';

export const routes: Routes = [
    {path: "", component: WorkoutInputComponent},
    {path: "workoutList", component: WorkoutListComponent}
];
