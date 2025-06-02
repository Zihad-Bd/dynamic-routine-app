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
                    },
                    {
                      abbreviation: 'LN',
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
                    },
                    {
                      abbreviation: 'RUM',
                    },
                    {
                      abbreviation: 'AI',
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
                    },
                    {
                      abbreviation: 'FA-1',
                    },
                    {
                      abbreviation: 'SR',
                    },
                    {
                      abbreviation: 'MI',
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
                    },
                    {
                      abbreviation: 'FA-1',
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
                    },
                    {
                      abbreviation: 'AI',
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
                    },
                    {
                      abbreviation: 'AMAR',
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
                    },
                    {
                      abbreviation: 'HH',
                    },
                    {
                      abbreviation: 'FA-2',
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
                    },
                    {
                      abbreviation: 'FA-2',
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
                  teachers: [],
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
                    },
                    {
                      abbreviation: 'GR',
                    },
                    {
                      abbreviation: 'AI',
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
                    },
                    {
                      abbreviation: 'FA-2',
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
                    },
                    {
                      abbreviation: 'FA-1',
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
                    },
                    {
                      abbreviation: 'RUM',
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
                    },
                    {
                      abbreviation: 'FA-1',
                    },
                    {
                      abbreviation: 'SR',
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
                    },
                    {
                      abbreviation: 'FA-2',
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
                    },
                    {
                      abbreviation: 'MI',
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
                    },
                    {
                      abbreviation: 'HK',
                    },
                    {
                      abbreviation: 'RUM',
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
                    },
                    {
                      abbreviation: 'AI',
                    },
                    {
                      abbreviation: 'FA-2',
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
                    },
                    {
                      abbreviation: 'GR',
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
                    },
                    {
                      abbreviation: 'LN',
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
                    },
                    {
                      abbreviation: 'MRH',
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
                    },
                    {
                      abbreviation: 'HK',
                    },
                    {
                      abbreviation: 'LN',
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
                    },
                    {
                      abbreviation: 'SR',
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
                    },
                    {
                      abbreviation: 'GR',
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
                    },
                    {
                      abbreviation: 'HH',
                    },
                    {
                      abbreviation: 'SR',
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
                    },
                    {
                      abbreviation: 'RUM',
                    },
                    {
                      abbreviation: 'MI',
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
