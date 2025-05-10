import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-class-routine-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './class-routine-form.component.html',
  styleUrls: ['./class-routine-form.component.scss'],
})
export class ClassRoutineFormComponent implements OnInit {
  routineForm!: FormGroup;

  workingDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  startTimeOptions = ['7 am', '8 am', '9 am', '10 am', '11 am'];
  endTimeOptions = ['12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'];
  breakPeriodOptions = [
    '8 am - 9 am',
    '9 am - 10 am',
    '10 am - 11 am',
    '11 am - 12 pm',
    '12 pm - 1 pm',
    '1 pm - 2 pm',
    '2 pm - 3 pm',
    '3 pm - 4 pm',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.routineForm = this.fb.group({
      workingDays: this.fb.group({
        Sunday: [false],
        Monday: [false],
        Tuesday: [false],
        Wednesday: [false],
        Thursday: [false],
        Friday: [false],
        Saturday: [false],
      }),
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      breakPeriod: ['', Validators.required],
    });
  }

  onSubmit(): void {
    debugger
    if (this.routineForm.valid) {
      console.log(this.routineForm.value);
    }
  }
}
