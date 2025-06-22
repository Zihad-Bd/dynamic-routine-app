import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  finalData: any;
  startTimeNum: number = 0;
  endTimeNum: number = 0;
  breakPeriodStartTimeNum: number = 0;
  codeHourPerClassMap: Map<string, number> = new Map();
  codeCourseTypeMap: Map<string, string> = new Map();
  totalClassHourForStudents: any;
  totalClassHourForTeachers: Map<string, number> = new Map();
  constructor() {}

  storeFinalData(finalData: any) {
    this.finalData = finalData;
    this.findTotalClassHourForStudents();
    this.findTotalClassHourForTeachers();
    this.initCourseCodeMaps();
  }

  findTotalClassHourForStudents() {
    this.totalClassHourForStudents = Array.from({ length: 8 }, () =>
      Array.from({ length: 6 }, () => 0)
    );
    for (let i = 0; i < this.finalData.years.length; i++) {
      const year = this.finalData.years[i];
      for (let j = 0; j < year.coursesBySemester.length; j++) {
        const semester = year.coursesBySemester[j];
        for (let k = 0; k < semester.courses.length; k++) {
          const course = semester.courses[k];
          this.totalClassHourForStudents[i][j] +=
            course.hoursPerClass * course.totalClassesPerWeek;
        }
      }
    }
  }

  getTotalClassHourForStudents() {
    return this.totalClassHourForStudents;
  }

  findTotalClassHourForTeachers() {
    this.totalClassHourForTeachers.clear();
    for (let i = 0; i < this.finalData.years.length; i++) {
      const year = this.finalData.years[i];
      for (let j = 0; j < year.coursesBySemester.length; j++) {
        const semester = year.coursesBySemester[j];
        for (let k = 0; k < semester.courses.length; k++) {
          const course = semester.courses[k];
          const teachers = course.teachers;
          for (let teacher of teachers) {
             this.totalClassHourForTeachers.set(teacher.abbreviation, (this.totalClassHourForTeachers.get(teacher.abbreviation) || 0) + course.hoursPerClass * course.totalClassesPerWeek);
          }
        }
      }
    }
  }

  getTotalClassHourForTeachers() {
    return this.totalClassHourForTeachers;
  }

  initCourseCodeMaps() {
    console.log(this.finalData);
    for (let i = 0; i < this.finalData.years.length; i++) {
      const year = this.finalData.years[i];
      for (let j = 0; j < year.coursesBySemester.length; j++) {
        const semester = year.coursesBySemester[j];
        for (let k = 0; k < semester.courses.length; k++) {
          const course = semester.courses[k];
          this.codeHourPerClassMap.set(course.courseCode, course.hoursPerClass);
          this.codeCourseTypeMap.set(course.courseCode, course.courseType);
        }
      }
    }
  }

  getCodeHourPerClassMap() {
    return this.codeHourPerClassMap;
  }

  getCodeCourseTypeMap() {
    return this.codeCourseTypeMap;
  }

  getFinalData() {
    return this.finalData;
  }

  getDaysInfo(): string[] {
    let workingDays = this.finalData.workingDays;
    const daysInfo: string[] = [];
    if (workingDays.Sunday) daysInfo.push('Sun');
    if (workingDays.Monday) daysInfo.push('Mon');
    if (workingDays.Tuesday) daysInfo.push('Tue');
    if (workingDays.Wednesday) daysInfo.push('Wed');
    if (workingDays.Thursday) daysInfo.push('Thu');
    if (workingDays.Friday) daysInfo.push('Fri');
    if (workingDays.Saturday) daysInfo.push('Sat');
    return daysInfo;
  }

  getYearsSemestersInfo(): any[] {
    let years = this.finalData.years;
    const yearsSemestersInfo: any[] = [];

    years?.forEach((year: any) => {
      const info: any = {
        yearName: year.yearName,
        semesterNames: [],
      };

      year?.coursesBySemester?.forEach((semester: any) => {
        if (semester?.semesterName) {
          info.semesterNames.push(semester.semesterName);
        }
      });
      if (info.semesterNames.length == 0) {
        info.semesterNames.push('');
      }
      yearsSemestersInfo.push(info);
    });

    return yearsSemestersInfo;
  }

  getTimeSlots() {
    this.processTimeSlots();
    let timeSlots: string[] = [];
    for (let i = this.startTimeNum; i <= this.endTimeNum - 1; ++i) {
      let first = i,
        second = i + 1;
      if (first > 12) {
        first -= 12;
      }
      if (second > 12) {
        second -= 12;
      }
      let timeSlot: string = `${first}:05 - ${second}:00`;
      timeSlots.push(timeSlot);
    }
    return timeSlots;
  }

  processTimeSlots() {
    let startTime = this.finalData.startTime;
    let endTime = this.finalData.endTime;
    let breakPeriod = this.finalData.breakPeriod;
    this.startTimeNum = this.getIntegerPartOfTime(startTime);
    this.endTimeNum = this.getIntegerPartOfTime(endTime);
    this.breakPeriodStartTimeNum =
      this.getBreakPeriodStartIntegerPartOfTime(breakPeriod);
  }

  getIntegerPartOfTime(time: string) {
    let len: number = time.length;
    let num: number = 0;
    for (let i = 0; i < len; ++i) {
      if (time[i] >= '0' && time[i] <= '9') {
        num = num * 10 + parseInt(time[i]);
      } else {
        break;
      }
    }
    if (time[len - 2] == 'p') {
      if (num != 12) {
        num += 12;
      }
    }
    return num;
  }

  getBreakPeriodStartIntegerPartOfTime(time: string) {
    let len: number = time.length;
    let startTime: string = '';
    for (let i = 0; i < len; ++i) {
      if (time[i] == '-') {
        break;
      }
      startTime = startTime + time[i];
    }
    startTime = startTime.slice(0, -1);
    return this.getIntegerPartOfTime(startTime);
  }

  getBreakPeriodTimeSlotIndex() {
    let startTime: number = this.startTimeNum;
    let breakPeriodStartTime: number = this.breakPeriodStartTimeNum;
    for (let i = 0; ; ++i, ++startTime) {
      if (startTime == breakPeriodStartTime) {
        return i;
      }
    }
  }
}
