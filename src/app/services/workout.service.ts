import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WorkoutService {
  userData = [
    { id: 1, name: 'Ramesh Musk', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
    { id: 2, name: 'Suresh Altman', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
    { id: 3, name: 'Michael Jordan', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] },
  ];

  constructor() {
    this.loadUserDataFromLocalStorage();
  }

  getUserData() {
    return this.userData;
  }

  private loadUserDataFromLocalStorage() {
    const storedData = localStorage.getItem('userData');
    const parsedData = storedData && JSON.parse(storedData);

    if (Array.isArray(parsedData)) {
      this.userData = [...this.userData, ...parsedData];
    }
  }

  addUserData(newUser: any) {
    this.userData.push(newUser);
    localStorage.setItem('userData', JSON.stringify(this.userData.slice(3)));
  }

  addExistingUser(existingUser: any) {
    // Find the index of the user in the userData array
    const index = this.userData.findIndex(user => user.name === existingUser.name);

    if (index !== -1) {
        // User exists, update their data
        this.userData[index] = { ...this.userData[index], ...existingUser };

        // Update local storage
        localStorage.setItem('userData', JSON.stringify(this.userData.slice(3)));
    }
}

}
