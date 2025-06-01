import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManualDataProviderService {

  manualData: any;
  constructor() { }

  getManualData() {
    this.manualData = {
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
              semesterName: 'Even',
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
    return this.manualData;
  }
}
