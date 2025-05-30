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
  finalData: any;

  constructor(private fb: FormBuilder) {}

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
      // numberOfRooms: ['', [Validators.required, Validators.min(1)]],
      // rooms: this.fb.array([]),
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
          name: ['', Validators.required],
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

  // get rooms(): FormArray {
  //   return this.routineForm.get('rooms') as FormArray;
  // }

  // addRooms(count: number): void {
  //   this.rooms.clear();
  //   for (let i = 0; i < count; i++) {
  //     this.rooms.push(
  //       this.fb.group({
  //         roomNo: ['', Validators.required],
  //         isTheory: [false],
  //         isLab: [false],
  //         labCourses: ['', Validators.required],
  //       })
  //     );
  //   }
  // }

  // onRoomCountChange(): void {
  //   const count = this.routineForm.get('numberOfRooms')?.value;
  //   if (count && count > 0) {
  //     this.addRooms(count);
  //   }
  // }

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
          rooms: ['', Validators.required],
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
          classesPerWeek: ['', [Validators.required, Validators.min(1)]],
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
    console.log(this.routineForm.value);
    // this.finalData = this.routineForm.value;
    debugger;
    // Use the below data for debugging purpose
    this.finalData = {
      universityName: 'University of Rajshahi',
      departmentName: 'Information and Communication Engineering',
      workingDays: {
        Sunday: true,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: false,
        Saturday: false,
      },
      startTime: '9 am',
      endTime: '4 pm',
      breakPeriod: '12 pm - 1 pm',
      numberOfTeachers: 21,
      teachers: [
        { name: 'Dr. Rubaiyat Yasmin', abbreviation: 'RY' },
        { name: 'Dr. Depankar Das', abbreviation: 'DD' },
        { name: 'Dr. A. M. Abdur Rahman', abbreviation: 'AMAR' },
        { name: 'Dr. Md. Emdadul Haque', abbreviation: 'EH' },
        { name: 'Dr. Mirza A.F.M. Rashidul Hasan', abbreviation: 'RH' },
        { name: 'Dr. Firoz Ahmed', abbreviation: 'FA-1' },
        { name: 'Dr. Halida Homyara ', abbreviation: 'HH' },
        { name: 'Dr. Md. Hasnat Kabir ', abbreviation: 'HK' },
        { name: 'Muhammad Sajjadur Rahim ', abbreviation: 'SR' },
        { name: 'Md. Reaz Hossain ', abbreviation: 'MRH' },
        { name: 'Dr Riaz Uddin Mondal ', abbreviation: 'RUM' },
        { name: 'Laila Naznin ', abbreviation: 'LN' },
        { name: 'Dr Md Golam Rashed ', abbreviation: 'GR' },
        { name: 'Mousumi Haque ', abbreviation: 'MH' },
        { name: 'Matiqul Islam ', abbreviation: 'MI' },
        { name: 'Dr Md Ashraful Islam ', abbreviation: 'AI' },
        { name: 'Md Firoz Ahmed-2 ', abbreviation: 'FA-2' },
        { name: 'Dr. S. M Monjurul Alam ', abbreviation: 'SMMA' },
        { name: 'Md. Zulfikar Ali', abbreviation: 'MZA' },
        { name: 'Natasha Afrin', abbreviation: 'NA' },
        { name: 'Dr. M Asaduzzaman', abbreviation: 'MA' },
      ],
      numberOfYears: 4,
      years: [
        {
          yearName: '1st',
          semesterNames: '',
          coursesBySemester: [
            {
              semesterName: '',
              numberOfCourses: 8,
              courses: [
                {
                  courseCode: 'ICE1211',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '403',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'HH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'LN',
                      classesPerWeek: 2,
                    },
                  ],
                },
                {
                  courseCode: 'STAT1211',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 0,
                  rooms: '403',
                  totalClassesPerWeek: 2,
                  teachers: [],
                },
                {
                  courseCode: 'PHY1221',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 0,
                  rooms: '403',
                  totalClassesPerWeek: 3,
                  teachers: [],
                },
                {
                  courseCode: 'ICE1212',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '233',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'AMAR',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'RUM',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'AI',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'CSE1292',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 4,
                  rooms: '277',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'EH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'FA-1',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'SR',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'MI',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'CSE1291',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '403',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'RY',
                      classesPerWeek: 2,
                    },
                    {
                      abbreviation: 'FA-1',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'MATH1211',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 0,
                  rooms: '403',
                  totalClassesPerWeek: 3,
                  teachers: [],
                },
                {
                  courseCode: 'ECON1211',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 0,
                  rooms: '403',
                  totalClassesPerWeek: 2,
                  teachers: [],
                },
              ],
            },
          ],
        },
        {
          yearName: '2nd',
          semesterNames: '',
          coursesBySemester: [
            {
              numberOfCourses: 8,
              semesterName: '',
              courses: [
                {
                  courseCode: 'STAT2111',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 0,
                  rooms: '437',
                  totalClassesPerWeek: 2,
                  teachers: [],
                },
                {
                  courseCode: 'ICE2121',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '437',
                  totalClassesPerWeek: 2,
                  teachers: [
                    {
                      abbreviation: 'RH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'AI',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE2111',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '437',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'RY',
                      classesPerWeek: 2,
                    },
                    {
                      abbreviation: 'AMAR',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE2112',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '234',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'AMAR',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'HH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'FA-2',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'EEE2191',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '437',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'LN',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'FA-2',
                      classesPerWeek: 2,
                    },
                  ],
                },
                {
                  courseCode: 'MATH2111',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 0,
                  rooms: '437',
                  totalClassesPerWeek: 3,
                  teachers: [{}],
                },
                {
                  courseCode: 'ACCO2111',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 0,
                  rooms: '437',
                  totalClassesPerWeek: 2,
                  teachers: [],
                },
                {
                  courseCode: 'ICE2122',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '234',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'MRH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'GR',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'AI',
                      classesPerWeek: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          semesterNames: '',
          yearName: '3rd',
          coursesBySemester: [
            {
              numberOfCourses: 8,
              semesterName: '',
              courses: [
                {
                  courseCode: 'ICE3111',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '440',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'RUM',
                      classesPerWeek: 2,
                    },
                    {
                      abbreviation: 'FA-2',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE3131',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '440',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'DD',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'FA-1',
                      classesPerWeek: 2,
                    },
                  ],
                },
                {
                  courseCode: 'ICE3151',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '440',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'AMAR',
                      classesPerWeek: 2,
                    },
                    {
                      abbreviation: 'RUM',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE3132',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '227',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'DD',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'FA-1',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'SR',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE3141',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '440',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'AI',
                      classesPerWeek: 2,
                    },
                    {
                      abbreviation: 'FA-2',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE3121',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '440',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'HK',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'MI',
                      classesPerWeek: 2,
                    },
                  ],
                },
                {
                  courseCode: 'ICE3122',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '227',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'RH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'HK',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'RUM',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE3142',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '228',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'MRH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'AI',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'FA-2',
                      classesPerWeek: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          semesterNames: '',
          yearName: '4th',
          coursesBySemester: [
            {
              numberOfCourses: 8,
              semesterName: '',
              courses: [
                {
                  courseCode: 'ICE4111',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '439',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'DD',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'GR',
                      classesPerWeek: 2,
                    },
                  ],
                },
                {
                  courseCode: 'ICE4121',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '439',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'FA-1',
                      classesPerWeek: 2,
                    },
                    {
                      abbreviation: 'LN',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE4131',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '439',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'AMAR',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'MRH',
                      classesPerWeek: 2,
                    },
                  ],
                },
                {
                  courseCode: 'ICE4122',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '402',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'FA-1',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'HK',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'LN',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE4141',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '439',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'HH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'SR',
                      classesPerWeek: 2,
                    },
                  ],
                },
                {
                  courseCode: 'ICE4151',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'theory',
                  hoursPerClass: 1,
                  numberOfTeachers: 2,
                  rooms: '439',
                  totalClassesPerWeek: 3,
                  teachers: [
                    {
                      abbreviation: 'RH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'GR',
                      classesPerWeek: 2,
                    },
                  ],
                },
                {
                  courseCode: 'ICE4142',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '402',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'DD',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'HH',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'SR',
                      classesPerWeek: 1,
                    },
                  ],
                },
                {
                  courseCode: 'ICE4132',
                  courseCredit: null,
                  courseName: '',
                  courseType: 'lab',
                  hoursPerClass: 3,
                  numberOfTeachers: 3,
                  rooms: '402',
                  totalClassesPerWeek: 1,
                  teachers: [
                    {
                      abbreviation: 'AMAR',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'RUM',
                      classesPerWeek: 1,
                    },
                    {
                      abbreviation: 'MI',
                      classesPerWeek: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
