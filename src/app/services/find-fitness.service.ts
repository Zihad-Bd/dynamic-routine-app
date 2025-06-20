import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class FindFitnessService {
  numOfWorkDay: number = 0;
  yearsSemestersInfo: any;
  numberOfTimeSlot: number = 0;
  routineInfo: any;
  codeHourPerClassMap: Map<string, number> = new Map();
  codeCourseTypeMap: Map<string, string> = new Map();
  constructor(private helperService: HelperService) {}

  setRequiredData(): void {
    this.numOfWorkDay = this.helperService.getDaysInfo().length;
    this.yearsSemestersInfo = this.helperService.getYearsSemestersInfo();
    this.numberOfTimeSlot = this.helperService.getTimeSlots().length;
    this.codeHourPerClassMap = this.helperService.getCodeHourPerClassMap();
    this.codeCourseTypeMap = this.helperService.getCodeCourseTypeMap();
  }

  findFitness(routineInfo: any): number {
    this.routineInfo = routineInfo;
    let unfitness: number = 0;
    unfitness += this.repeatingClassInADay();
    return 1e8 - unfitness;
  }

  repeatingClassInADay() {
    let unfitness: number = 0;
    for (let i = 0; i < this.numOfWorkDay; ++i) {
      for (let j = 0; j < this.yearsSemestersInfo.length; ++j) {
        let numOfSemester = this.yearsSemestersInfo[j].semesterNames.length;
        for (let k = 0; k < numOfSemester; ++k) {
          let mp: Map<string, number> = new Map();
          for (let l = 0; l < this.numberOfTimeSlot; ++l) {
            let courseCode = this.routineInfo[i][j][k][l].courseCode;
            if (courseCode != '') {
              mp.set(courseCode, (mp.get(courseCode) || 0) + 1);
            }
          }
          for (const [key, value] of mp.entries()) {
            const hourPerClass = this.codeHourPerClassMap.get(key);
            const courseType = this.codeCourseTypeMap.get(key);
            let cnt: number = 0;
            if (hourPerClass !== undefined) {
              cnt = value / hourPerClass;
            }
            if (cnt > 1) {
              if (courseType == "lab") {
                unfitness += (cnt - 1) * 500;
              } else {
                unfitness += (cnt - 1) * 400;
              }
            }
          }
        }
      }
    }
    return unfitness;
  }
}
