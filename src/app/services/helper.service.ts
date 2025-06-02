import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  finalData: any;
  startTimeNum: number = 0;
  endTimeNum: number = 0;
  breakPeriodStartTimeNum: number = 0;
  constructor() {}

  storeFinalData(finalData: any) {
    this.finalData = finalData;
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
