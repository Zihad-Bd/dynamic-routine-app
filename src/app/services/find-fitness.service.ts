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
  totalClassHourForStudents: any;
  totalClassHourForTeachers: Map<string, number> = new Map();
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
    unfitness += this.findUnfitnessForRepeatingClassInADay();
    unfitness += this.findUnfitnessForConsequtiveClassOfATeacher();
    unfitness += this.findUnfitnessForConsequtiveClassOfStudents();
    unfitness += this.findUnfitnessForUnusualClassOfStudents();
    unfitness += this.findUnfitnessForUnusualClassOfTeachers();
    return 1e8 - unfitness;
  }

  findUnfitnessForRepeatingClassInADay(): number {
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
            const hoursPerClass = this.codeHourPerClassMap.get(key);
            const courseType = this.codeCourseTypeMap.get(key);
            let cnt: number = 0;
            if (hoursPerClass !== undefined) {
              cnt = value / hoursPerClass;
            }
            if (cnt > 1) {
              if (courseType == 'lab') {
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

  findUnfitnessForConsequtiveClassOfATeacher(): number {
    let unfitness: number = 0;
    for (let i = 0; i < this.numOfWorkDay; ++i) {
      let mp: Map<string, [number, number][]> = new Map();
      for (let j = 0; j < this.yearsSemestersInfo.length; ++j) {
        let numOfSemester = this.yearsSemestersInfo[j].semesterNames.length;
        for (let k = 0; k < numOfSemester; ++k) {
          for (let l = 0; l < this.numberOfTimeSlot; ++l) {
            if (this.routineInfo[i][j][k][l].isFirstHour == true) {
              let teachers = this.routineInfo[i][j][k][l].teachers;
              for (let teacher of teachers) {
                teacher = teacher.abbreviation;
                if (teacher != '') {
                  const r = l + this.routineInfo[i][j][k][l].hoursPerClass - 1;
                  const pair: [number, number] = [l, r];
                  if (!mp.has(teacher)) {
                    mp.set(teacher, []);
                  }
                  mp.get(teacher)!.push(pair);
                }
              }
            }
          }
        }
      }
      for (const [key, pairs] of mp.entries()) {
        pairs.sort((a, b) => a[0] - b[0]);
        let pairs2 = pairs;
        for (let left = 0, right = 0; left < pairs2.length; ) {
          right = left;
          while (
            right + 1 < pairs2.length &&
            pairs2[right][1] + 1 == pairs2[right + 1][0]
          ) {
            ++right;
          }
          if (left < right) {
            const totalTimeSlot = pairs2[right][1] - pairs2[left][0] + 1;
            unfitness += totalTimeSlot * 30;
          }
          left = right + 1;
        }
      }
    }
    return unfitness;
  }

  findUnfitnessForConsequtiveClassOfStudents(): number {
    let unfitness: number = 0;
    for (let i = 0; i < this.numOfWorkDay; ++i) {
      for (let j = 0; j < this.yearsSemestersInfo.length; ++j) {
        let numOfSemester = this.yearsSemestersInfo[j].semesterNames.length;
        for (let k = 0; k < numOfSemester; ++k) {
          let pairs: [number, number][] = [];
          for (let l = 0; l < this.numberOfTimeSlot; ++l) {
            if (this.routineInfo[i][j][k][l].isFirstHour == true) {
              const r = l + this.routineInfo[i][j][k][l].hoursPerClass - 1;
              pairs.push([l, r]);
            }
          }
          for (let left = 0, right = 0; left < pairs.length; ) {
            right = left;
            while (
              right + 1 < pairs.length &&
              pairs[right][1] + 1 == pairs[right + 1][0]
            ) {
              ++right;
            }
            if (left < right) {
              const totalTimeSlot = pairs[right][1] - pairs[left][0] + 1;
              if (totalTimeSlot >= 4) unfitness += totalTimeSlot * 20;
            }
            left = right + 1;
          }
        }
      }
    }
    return unfitness;
  }

  findUnfitnessForUnusualClassOfStudents(): number {
    this.totalClassHourForStudents =
      this.helperService.getTotalClassHourForStudents();
    let unfitness = 0;
    for (let i = 0; i < this.numOfWorkDay; ++i) {
      for (let j = 0; j < this.yearsSemestersInfo.length; ++j) {
        let numOfSemester = this.yearsSemestersInfo[j].semesterNames.length;
        for (let k = 0; k < numOfSemester; ++k) {
          let totalClassHourInADay = 0;
          for (let l = 0; l < this.numberOfTimeSlot; ++l) {
            if (this.routineInfo[i][j][k][l].isOccupied == true) {
              totalClassHourInADay++;
            }
          }
          const optimalAverageClassHourPerDay = Math.round(
            this.totalClassHourForStudents[j][k] / this.numOfWorkDay
          );
          const difference = Math.abs(
            totalClassHourInADay - optimalAverageClassHourPerDay
          );
          if (difference > 1) {
            unfitness += (difference - 1) * 40;
          }
        }
      }
    }
    return unfitness;
  }

  findUnfitnessForUnusualClassOfTeachers(): number {
    this.totalClassHourForTeachers =
      this.helperService.getTotalClassHourForTeachers();
    let unfitness = 0;
    for (let i = 0; i < this.numOfWorkDay; ++i) {
      let totalClassHourInADay: Map<string, number> = new Map();
      for (let j = 0; j < this.yearsSemestersInfo.length; ++j) {
        let numOfSemester = this.yearsSemestersInfo[j].semesterNames.length;
        for (let k = 0; k < numOfSemester; ++k) {
          for (let l = 0; l < this.numberOfTimeSlot; ++l) {
            if (this.routineInfo[i][j][k][l].isOccupied == true) {
              let teachers = this.routineInfo[i][j][k][l].teachers;
              for (let teacher of teachers) {
                teacher = teacher.abbreviation;
                if (teacher != '') {
                  totalClassHourInADay.set(
                    teacher,
                    (totalClassHourInADay.get(teacher) || 0) + 1
                  );
                }
              }
            }
          }
        }
      }
      for (const [teacher, value] of totalClassHourInADay) {
        const optimalAverageClassHourPerDay = Math.round(
          (this.totalClassHourForTeachers.get(teacher) || 0) / this.numOfWorkDay
        );
        const difference = Math.abs(value - optimalAverageClassHourPerDay);
        if (difference > 1) {
          unfitness += (difference - 1) * 50;
        }
      }
    }
    return unfitness;
  }
}
