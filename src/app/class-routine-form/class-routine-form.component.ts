import { GenerateRoutineService } from './../services/generate-routine.service';
import { HelperService } from './../services/helper.service';
import { ManualDataProviderService } from './../services/manual-data-provider.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
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
import { MatDialog } from '@angular/material/dialog';
import { RoutineComponent } from '../routine/routine.component';

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
  startTimeOptions = [
    '7 am',
    '8 am',
    '9 am',
    '10 am',
    '11 am',
    '12 pm',
    '1 pm',
    '2 pm',
    '3 pm',
    '4 pm',
    '5 pm',
    '6 pm',
    '7 pm',
  ];
  endTimeOptions = [
    '10 am',
    '11 am',
    '12 pm',
    '1 pm',
    '2 pm',
    '3 pm',
    '4 pm',
    '5 pm',
    '6 pm',
    '7 pm',
    '8 pm',
    '9 pm',
  ];
  breakPeriodOptions = [
    '8 am - 9 am',
    '9 am - 10 am',
    '10 am - 11 am',
    '11 am - 12 pm',
    '12 pm - 1 pm',
    '1 pm - 2 pm',
    '2 pm - 3 pm',
    '3 pm - 4 pm',
    '4 pm - 5 pm',
    '5 pm - 6 pm',
    '6 pm - 7 pm',
    '7 pm - 8 pm',
  ];
  finalData: any;

  constructor(
    private fb: FormBuilder,
    private manualDataProviderService: ManualDataProviderService,
    private helperService: HelperService,
    private dialog: MatDialog,
    private generateRoutineService: GenerateRoutineService
  ) {}

  ngOnInit(): void {
    this.routineForm = this.fb.group({
      universityName: ['', Validators.required],
      departmentName: ['', Validators.required],
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
      numberOfTeachers: ['', [Validators.required, Validators.min(1)]],
      teachers: this.fb.array([]),
      numberOfYears: ['', [Validators.required, Validators.min(1)]],
      years: this.fb.array([]),
    });
  }

  get teachers(): FormArray {
    return this.routineForm.get('teachers') as FormArray;
  }

  addTeachers(count: number): void {
    this.teachers.clear();
    for (let i = 0; i < count; i++) {
      this.teachers.push(
        this.fb.group({
          name: [''],
          abbreviation: ['', Validators.required],
        })
      );
    }
  }

  onTeacherCountChange(): void {
    const count = this.routineForm.get('numberOfTeachers')?.value;
    if (count && count > 0) {
      this.addTeachers(count);
    }
  }

  get years(): FormArray {
    return this.routineForm.get('years') as FormArray;
  }

  addYears(count: number): void {
    this.years.clear();
    for (let i = 0; i < count; i++) {
      this.years.push(
        this.fb.group({
          yearName: ['', Validators.required],
          semesterNames: [''], // comma separated
          coursesBySemester: this.fb.array([]), // will populate later
        })
      );
    }
  }

  onYearCountChange(): void {
    const count = this.routineForm.get('numberOfYears')?.value;
    if (count && count > 0) {
      this.addYears(count);
    }
  }

  getCoursesBySemester(yearIndex: number): FormArray {
    return this.years.at(yearIndex).get('coursesBySemester') as FormArray;
  }

  getCourses(yearIndex: number, semesterIndex: number): FormArray {
    return this.getCoursesBySemester(yearIndex)
      .at(semesterIndex)
      .get('courses') as FormArray;
  }

  getCourseTeachers(
    yearIndex: number,
    semesterIndex: number,
    courseIndex: number
  ): FormArray {
    return this.getCourses(yearIndex, semesterIndex)
      .at(courseIndex)
      .get('teachers') as FormArray;
  }

  onYearNameChange(yearIndex: number): void {
    const yearGroup = this.years.at(yearIndex) as FormGroup;

    // Clear semester names
    yearGroup.get('semesterNames')?.setValue('');

    // Get year name value
    const yearName = yearGroup.get('yearName')?.value || '';

    const courseArray = this.getCoursesBySemester(yearIndex);
    courseArray.clear();

    if (yearName.trim()) {
      // Add a single unnamed semester section
      courseArray.push(
        this.fb.group({
          semesterName: [''],
          numberOfCourses: ['', [Validators.required, Validators.min(1)]],
          courses: this.fb.array([]),
        })
      );
    }
  }

  onSemesterChange(yearIndex: number): void {
    const yearGroup = this.years.at(yearIndex) as FormGroup;
    const semesterString = yearGroup.get('semesterNames')?.value || '';
    const semesterList = semesterString
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s !== '');

    const courseArray = this.getCoursesBySemester(yearIndex);
    courseArray.clear();

    // If no semester given, treat as unnamed single semester
    if (semesterList.length === 0) {
      courseArray.push(
        this.fb.group({
          semesterName: [''],
          numberOfCourses: ['', [Validators.required, Validators.min(1)]],
          courses: this.fb.array([]),
        })
      );
    } else {
      semesterList.forEach((sem: string) => {
        courseArray.push(
          this.fb.group({
            semesterName: [sem],
            numberOfCourses: ['', [Validators.required, Validators.min(1)]],
            courses: this.fb.array([]),
          })
        );
      });
    }
  }

  onCourseCountChange(yearIndex: number, semesterIndex: number): void {
    const semesterGroup = this.getCoursesBySemester(yearIndex).at(
      semesterIndex
    ) as FormGroup;
    const count = semesterGroup.get('numberOfCourses')?.value;

    const courseArray = semesterGroup.get('courses') as FormArray;
    courseArray.clear();

    for (let i = 0; i < count; i++) {
      courseArray.push(
        this.fb.group({
          courseName: [''],
          courseCode: ['', Validators.required],
          courseCredit: [null],
          courseType: ['', Validators.required], // NEW
          hoursPerClass: ['', [Validators.required, Validators.min(1)]],
          totalClassesPerWeek: [null, [Validators.required, Validators.min(1)]],
          numberOfTeachers: ['', [Validators.required, Validators.min(0)]],
          teachers: this.fb.array([]),
          rooms: [''],
        })
      );
    }
  }

  onCourseTeacherCountChange(
    yearIndex: number,
    semesterIndex: number,
    courseIndex: number
  ): void {
    const courseGroup = this.getCourses(yearIndex, semesterIndex).at(
      courseIndex
    ) as FormGroup;
    const count = courseGroup.get('numberOfTeachers')?.value;
    const teacherArray = courseGroup.get('teachers') as FormArray;
    teacherArray.clear();

    for (let i = 0; i < count; i++) {
      teacherArray.push(
        this.fb.group({
          abbreviation: ['', Validators.required],
          // classesPerWeek: ['', [Validators.required, Validators.min(1)]],
        })
      );
    }
  }

  getSemesterHeader(year: string, semester: string): string {
    if (!semester) {
      return `${year} Details`;
    }
    return `${year} ${semester} Details`;
  }

  onSubmit(): void {
    //console.log(this.routineForm.value);
    //this.finalData = this.routineForm.value;
    // Use the below data for debugging purpose
    this.finalData = this.manualDataProviderService.getManualData();
    this.helperService.storeFinalData(this.finalData);
    const universityName = this.finalData.universityName;
    const departmentName = this.finalData.departmentName;
    const daysInfo = this.helperService.getDaysInfo();
    const yearsSemestersInfo = this.helperService.getYearsSemestersInfo();
    const timeSlotsInfo = this.helperService.getTimeSlots();
    const breakPeriodTimeSlotIndex =
      this.helperService.getBreakPeriodTimeSlotIndex();
    this.generateRoutineService.generateRoutines(
      breakPeriodTimeSlotIndex,
      daysInfo,
      timeSlotsInfo
    );
    const bestRoutine = this.generateRoutineService.getBestRoutine();
    this.dialog.open(RoutineComponent, {
      width: '90vw', // or your desired width
      maxWidth: '90vw',
      data: {
        universityName,
        departmentName,
        daysInfo,
        yearsSemestersInfo,
        timeSlotsInfo,
        bestRoutine,
      },
    });
  }
}
