# HealthChallengeTracker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Clone the repository

Open the Terminal and navigate to the directory where you want to clone the project

```bash
cd /path/to/your/directory
```

Clone the project repository using the git clone command

```bash
git clone https://github.com/ab00s1/Health-Challenge-Tracker.git
```

Navigate into the cloned project directory:

```bash
cd Health-Challenge-Tracker
```

## Dependencies Installation

To install the dependencies, run:

```bash
npm i
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




# About the Project

## Project Description

This is a Single Page Application (SPA) built using Angular 14+. The app allows users to manage workout data by adding user details, workout types, and workout durations. The application provides functionalities like:

* Adding users and their workouts (with a name, workout type, and duration in minutes).
* Displaying the list of users and their workouts in a table grid.
* Search functionality to find users by name.
* Filter functionality to filter users by workout type.
* Pagination for displaying user data when more than 5 users are added.
* Data Storage using localStorage for persistence.
* Visualization of workout data with charts .

## Features

* Input Fields: Users can add the name, workout type, and minutes.
* Display Data: All users and their workouts are displayed in a table grid.
* Search & Filter: Users can search by username.
* Users can filter by workout type (e.g., Running, Cycling, etc.).
* Pagination: Displays paginated data if there are more than 5 users.
* Charts: Displays workout progress using charts (bonus feature).
* Responsive UI: The app uses Tailwind CSS for responsive design.
* Data Persistence: User data is stored in the localStorage for persistence.
* Unit Tests: Includes unit tests with code coverage report attached for components and services.

### Cloud Deployment: The SPA is hosted on ***Netlify***.

## Libraries and Tools Used

* Angular 14+: Framework used for building the SPA.
* Tailwind CSS: Utility-first CSS framework used for styling.
* localStorage: Used for storing user data persistently.
* Jasmine/Karma: Used for writing and running unit tests.

## Unit Testing

Unit tests are written for both the components like **workout-input, workout-list, workout-progress and app** and service like **workout.service** to ensure the proper functionality of the app.

## Coverage Report

![Coverage Report](public/Coverage%20Report.png)
