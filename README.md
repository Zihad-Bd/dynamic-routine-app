The best possible class routine has been generated based on the following criteria as much as possible:

1. No more than one class of the same course is scheduled on the same day.
2. Avoid scheduling too many consecutive classes for any teacher.
3. Avoid scheduling too many consecutive classes for students.
4. Ensure that the number of classes scheduled for any teacher in a single day is neither too few nor too many.
5. Ensure that the number of classes scheduled for students in a single day is neither too few nor too many.

## Routine Generation Approach

The routine was generated through a multi-step process involving validation, fitness evaluation, and iterative improvement using crossover techniques:

1. **Initial Routine Generation**
   - A set of valid routines was first generated.
   - A routine is considered valid if it satisfies:
     - No student or teacher is scheduled for multiple classes at the same time on the same day.
     - No room is assigned to more than one class at the same time on the same day.

2. **Fitness Evaluation**
   - Each valid routine was evaluated using a fitness score.
   - The score reflects how well a routine satisfies several predefined criteria.
   - The more criteria met, the higher the fitness score.

3. **Crossover Operation**
   - To improve routine quality, a genetic crossover method was applied:
     - Two parent routines were selected.
     - A course was randomly chosen, and its class times from both parents were retrieved.
     - For a course with 3 weekly classes, 6 time slots (3 from each parent) were considered.
     - Three non-overlapping time slots were randomly picked.
     - These were combined with the remaining courses from the first parent to form a child routine.
     - The second child was generated similarly using a mirrored process.

4. **Selection and Iteration**
   - All routines were sorted by fitness score.
   - The top 50% were retained; the bottom 50% were discarded.
   - Crossover was then repeated on the selected routines.
   - This process was run for 50 total iterations.

5. **Final Selection**
   - After all iterations, the routine with the highest fitness score was chosen as the final output.

> **Note:** Multiple valid and high-quality routines can be generated from the same input due to the randomness in the crossover process.



# DynamicRoutine

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

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

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
