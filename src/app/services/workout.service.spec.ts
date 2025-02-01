import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
    let service: WorkoutService;
    let mockLocalStorage: { [key: string]: string };

    beforeEach(() => {
        mockLocalStorage = {}; // Reset mock localStorage before each test

        spyOn(localStorage, 'getItem').and.callFake((key: string) => mockLocalStorage[key] || null);
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
            mockLocalStorage[key] = value;
        });

        // Adding mock data to localStorage
        mockLocalStorage['userData'] = JSON.stringify([
            { id: 1, name: 'Ramesh Musk', workouts: [{ type: 'Running', minutes: 30 }] },
            { id: 2, name: 'Suresh Altman', workouts: [{ type: 'Swimming', minutes: 60 }] }
        ]);

        TestBed.configureTestingModule({});
        service = TestBed.inject(WorkoutService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize userData from localStorage in the constructor', () => {
        // Assert that the userData is populated with localStorage data.
        expect(service.getUserData().length).toBe(5); // 3 default users + 2 from localStorage
        expect(service.getUserData()[0].name).toBe('Ramesh Musk');
        expect(service.getUserData()[1].name).toBe('Suresh Altman');
    });

    it('should update existing user and save to localStorage', () => {
        const updatedUser = { id: 1, name: 'Ramesh Musk', workouts: [{ type: 'Weightlifting', minutes: 50 }] };

        const storedData = JSON.parse(mockLocalStorage['userData']);
        const index = storedData.findIndex((user: { name: string }) => user.name === updatedUser.name);

        if (index !== -1) {
            storedData[index] = { ...storedData[index], ...updatedUser };

            mockLocalStorage['userData'] = JSON.stringify(storedData);
        }

        const updatedUserData = JSON.parse(mockLocalStorage['userData']).find((user: { name: string; }) => user.name === 'Ramesh Musk');
        expect(updatedUserData).toBeDefined();
        expect(updatedUserData?.workouts.length).toBe(1);
        expect(updatedUserData?.workouts[0].type).toBe('Weightlifting');

        const finalStoredData = JSON.parse(mockLocalStorage['userData']);
        expect(finalStoredData.length).toBe(2);
        expect(finalStoredData[0].name).toBe('Ramesh Musk');
        expect(finalStoredData[0].workouts[0].type).toBe('Weightlifting');
    });
});
