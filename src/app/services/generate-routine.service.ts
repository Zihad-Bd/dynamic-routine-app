import { Injectable } from '@angular/core';
import { FindFitnessService } from './find-fitness.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class GenerateRoutineService {
  routinesInfo: any;
  breakPeriodTimeSlotIndex: number = 0;
  numberOfDays: number = 0;
  numberOfTimeSlots: number = 0;
  finalData: any;
  routineIdFitness: [number, number][] = [];
  isValidRoutineExistMp: Map<number, boolean> = new Map();
  constructor(
    private helperService: HelperService,
    private findFitnessService: FindFitnessService
  ) {}

  generateRoutines(
    breakPeriodTimeSlotIndex: number,
    daysInfo: string[],
    timeSlotsInfo: string[]
  ) {
    this.breakPeriodTimeSlotIndex = breakPeriodTimeSlotIndex;
    this.numberOfDays = daysInfo.length;
    this.numberOfTimeSlots = timeSlotsInfo.length;
    this.routinesInfo = Array.from({ length: 4000 }, () =>
      Array.from({ length: 7 }, () =>
        Array.from({ length: 8 }, () =>
          Array.from(
            { length: 6 },
            () => Array.from({ length: 20 }, () => ({})) // Initialize as empty objects
          )
        )
      )
    );
    for (let i = 0; i < 4000; ++i) {
      this.clearRoutine(i);
    }
    this.finalData = this.helperService.getFinalData();

    for (let i = 0; i < this.finalData.years.length; i++) {
      const year = this.finalData.years[i];
      for (let j = 0; j < year.coursesBySemester.length; j++) {
        const semester = year.coursesBySemester[j];
        for (let k = 0; k < semester.courses.length; k++) {
          const course = semester.courses[k];
          if (course.rooms == '') {
            course.rooms = [];
          } else if (typeof course.rooms === 'string') {
            course.rooms = course.rooms
              .split(',')
              .map((room: string) => room.trim());
          }
        }
      }
    }
    this.generateInitialRoutines();
    this.findInitialRoutineFitness();
    this.initializeRoutineExistMap();
    this.applyCrossover();
  }

  generateInitialRoutines() {
    for (let routineId = 0; routineId < 2000; ++routineId) {
      const haveClassForTeacherMap = new Map<string, boolean>();
      const haveRoomMap = new Map<string, boolean>();
      let possible: boolean = this.checkInsertionPossibility(
        routineId,
        haveClassForTeacherMap,
        haveRoomMap,
        'lab'
      );
      if (possible == true) {
        possible = this.checkInsertionPossibility(
          routineId,
          haveClassForTeacherMap,
          haveRoomMap,
          'theory'
        );
        if (possible == false) {
          this.clearRoutine(routineId);
          --routineId;
        }
      } else {
        this.clearRoutine(routineId);
        --routineId;
      }
    }
  }

  checkInsertionPossibility(
    routineId: number,
    haveClassForTeacherMap: Map<string, boolean>,
    haveRoomMap: Map<string, boolean>,
    courseType: string
  ): boolean {
    let possible: boolean;
    for (let i = 0; i < this.finalData.years.length; i++) {
      const year = this.finalData.years[i];
      for (let j = 0; j < year.coursesBySemester.length; j++) {
        const semester = year.coursesBySemester[j];
        for (let k = 0; k < semester.courses.length; k++) {
          const course = semester.courses[k];
          if (course.courseType == courseType) {
            possible = this.findDaysAndTimeSlots(
              routineId,
              i,
              j,
              haveClassForTeacherMap,
              haveRoomMap,
              course
            );
            if (possible == false) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  findDaysAndTimeSlots(
    routineId: number,
    yearId: number,
    semesterId: number,
    haveClassForTeacherMap: Map<string, boolean>,
    haveRoomMap: Map<string, boolean>,
    courseInfo: any
  ): boolean {
    for (let l = 0; l < courseInfo.totalClassesPerWeek; ++l) {
      let isInsertable: boolean = true;
      for (let i = 0; i < 50; ++i) {
        const dayId: number = this.getRandomInteger(0, this.numberOfDays - 1);
        const timeSlotId: number = this.getRandomInteger(
          0,
          this.numberOfTimeSlots - 1
        );
        const hoursPerClass = courseInfo.hoursPerClass;
        const rooms = courseInfo.rooms;
        const teachers = courseInfo.teachers;
        isInsertable = this.isSlotsFreeForStudent(
          routineId,
          dayId,
          yearId,
          semesterId,
          timeSlotId,
          hoursPerClass
        );
        if (isInsertable) {
          isInsertable = this.isSlotsFreeForTeacher(
            dayId,
            timeSlotId,
            hoursPerClass,
            teachers,
            haveClassForTeacherMap
          );
        }
        let selectedRoom: string = '';
        if (isInsertable) {
          if (rooms.length > 0) {
            for (let p = 0; p < rooms.length * 3; ++p) {
              const roomId = this.getRandomInteger(0, rooms.length - 1);
              let roomNo = rooms[roomId];
              let isRoomFree: boolean = true;
              isRoomFree = this.isSlotsFreeForRoom(
                dayId,
                timeSlotId,
                hoursPerClass,
                haveRoomMap,
                roomNo
              );
              if (isRoomFree) {
                selectedRoom = rooms[roomId];
                break;
              }
            }
            if (selectedRoom == '') isInsertable = false;
          }
        }
        if (isInsertable) {
          this.insertDataIntoRoutine(
            routineId,
            dayId,
            yearId,
            semesterId,
            timeSlotId,
            hoursPerClass,
            courseInfo,
            teachers,
            haveClassForTeacherMap,
            haveRoomMap,
            selectedRoom
          );
          break;
        }
      }
      if (isInsertable == false) {
        return false;
      }
    }
    return true;
  }

  isSlotsFreeForStudent(
    routineId: number,
    dayId: number,
    yearId: number,
    semesterId: number,
    timeSlotId: number,
    hoursPerClass: number
  ): boolean {
    if (
      this.breakPeriodTimeSlotIndex >= timeSlotId &&
      this.breakPeriodTimeSlotIndex <= timeSlotId + hoursPerClass - 1
    ) {
      return false;
    }
    for (let j = timeSlotId; j <= timeSlotId + hoursPerClass - 1; ++j) {
      if (j > this.numberOfTimeSlots - 1) {
        return false;
      }
      if (
        this.routinesInfo[routineId][dayId][yearId][semesterId][timeSlotId]
          .isOccupied == true
      ) {
        return false;
      }
    }
    return true;
  }

  isSlotsFreeForTeacher(
    dayId: number,
    timeSlotId: number,
    hoursPerClass: number,
    teachers: any,
    haveClassForTeacherMap: Map<string, boolean>
  ): boolean {
    for (let j = timeSlotId; j <= timeSlotId + hoursPerClass - 1; ++j) {
      for (let k = 0; k < teachers.length; ++k) {
        const str = `${dayId}_${j}_${teachers[k].abbreviation}`;
        if (
          haveClassForTeacherMap.has(str) &&
          haveClassForTeacherMap.get(str) == true
        ) {
          return false;
        }
      }
    }
    return true;
  }

  isSlotsFreeForRoom(
    dayId: number,
    timeSlotId: number,
    hoursPerClass: number,
    haveRoomMap: Map<string, boolean>,
    roomNo: string
  ): boolean {
    for (let j = timeSlotId; j <= timeSlotId + hoursPerClass - 1; ++j) {
      const str = `${dayId}_${j}_${roomNo}`;
      if (haveRoomMap.has(str) && haveRoomMap.get(str) == true) {
        return false;
      }
    }
    return true;
  }

  insertDataIntoRoutine(
    routineId: number,
    dayId: number,
    yearId: number,
    semesterId: number,
    timeSlotId: number,
    hoursPerClass: number,
    courseInfo: any,
    teachers: any,
    haveClassForTeacherMap: Map<string, boolean>,
    haveRoomMap: Map<string, boolean>,
    roomNo: string
  ) {
    for (let j = timeSlotId; j <= timeSlotId + hoursPerClass - 1; ++j) {
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].courseCode =
        courseInfo.courseCode;
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].courseType =
        courseInfo.courseType;
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].roomNo =
        roomNo;
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].teachers =
        teachers;
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].isOccupied =
        true;
      if (j == timeSlotId) {
        this.routinesInfo[routineId][dayId][yearId][semesterId][j].isFirstHour =
          true;
      }
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].hoursPerClass =
        courseInfo.hoursPerClass;
      for (let k = 0; k < teachers.length; ++k) {
        const str = `${dayId}_${j}_${teachers[k].abbreviation}`;
        haveClassForTeacherMap.set(str, true);
      }
      const str = `${dayId}_${j}_${roomNo}`;
      haveRoomMap.set(str, true);
    }
  }

  clearRoutine(routineId: number) {
    for (let j = 0; j < 7; ++j) {
      for (let k = 0; k < 8; ++k) {
        for (let l = 0; l < 6; ++l) {
          for (let m = 0; m < 20; ++m) {
            this.routinesInfo[routineId][j][k][l][m].courseCode = '';
            this.routinesInfo[routineId][j][k][l][m].courseType = '';
            this.routinesInfo[routineId][j][k][l][m].roomNo = '';
            this.routinesInfo[routineId][j][k][l][m].teachers = [];
            this.routinesInfo[routineId][j][k][l][m].isOccupied = false;
            this.routinesInfo[routineId][j][k][l][m].isFirstHour = false;
            this.routinesInfo[routineId][j][k][l][m].hoursPerClass = 1;
          }
        }
      }
    }
  }

  findInitialRoutineFitness() {
    this.initializeRoutineFitness();
    this.findFitnessService.setRequiredData();
    for (let i = 0; i < 4000; ++i) {
      this.routineIdFitness[i][0] = i;
      if (i < 2000) {
        this.routineIdFitness[i][1] = this.findFitnessService.findFitness(
          this.routinesInfo[i]
        );
      }
    }
  }

  initializeRoutineFitness(): void {
    this.routineIdFitness = Array.from({ length: 4000 }, () => [0, 0]);
  }

  initializeRoutineExistMap() {
    for (let i = 0; i < 2000; ++i) {
      this.isValidRoutineExistMp.set(i, true);
    }
    for (let i = 2000; i < 4000; ++i) {
      this.isValidRoutineExistMp.set(i, false);
    }
  }

  applyCrossover() {
    for (let i = 0; i < 50; ++i) {
      console.log(this.routineIdFitness[0][1]);
      for (let j = 0; j < 1999; j += 2) {
        let parent1Id = this.routineIdFitness[j][0];
        let parent2Id = this.routineIdFitness[1999 - j][0];
        let child1Id = this.routineIdFitness[j + 2000][0];
        let child2Id = this.routineIdFitness[j + 2001][0];
        const yearId = this.getRandomInteger(
          0,
          this.finalData.years.length - 1
        );
        const semesterId = this.getRandomInteger(
          0,
          this.finalData.years[yearId].coursesBySemester.length - 1
        );
        const courseId = this.getRandomInteger(
          0,
          this.finalData.years[yearId].coursesBySemester[semesterId].courses
            .length - 1
        );
        const courseInfo =
          this.finalData.years[yearId].coursesBySemester[semesterId].courses[
            courseId
          ];
        let daySlotTimeSlotRoomNo: [number, number, string][] = [];
        for (let k = 0; k < this.numberOfDays; ++k) {
          for (let l = 0; l < this.numberOfTimeSlots; ++l) {
            const info = this.routinesInfo[parent1Id][k][yearId][semesterId][l];
            if (
              info.courseCode == courseInfo.courseCode &&
              info.isFirstHour == true
            ) {
              daySlotTimeSlotRoomNo.push([k, l, info.roomNo]);
            }
          }
        }
        for (let k = 0; k < this.numberOfDays; ++k) {
          for (let l = 0; l < this.numberOfTimeSlots; ++l) {
            const info = this.routinesInfo[parent2Id][k][yearId][semesterId][l];
            if (
              info.courseCode == courseInfo.courseCode &&
              info.isFirstHour == true
            ) {
              daySlotTimeSlotRoomNo.push([k, l, info.roomNo]);
            }
          }
        }
        this.tryToGenerateChild(
          parent1Id,
          child1Id,
          courseInfo,
          daySlotTimeSlotRoomNo,
          yearId,
          semesterId
        );
        this.tryToGenerateChild(
          parent2Id,
          child2Id,
          courseInfo,
          daySlotTimeSlotRoomNo,
          yearId,
          semesterId
        );
      }
      for (let i = 2000; i < 4000; ++i) {
        if (this.isValidRoutineExistMp.get(this.routineIdFitness[i][0]) == true) {
          this.routineIdFitness[i][1] = this.findFitnessService.findFitness(this.routinesInfo[this.routineIdFitness[i][0]]);
        } else {
          this.routineIdFitness[i][1] = 0;
        }
      }
      this.routineIdFitness.sort((a, b) => b[1] - a[1]);
    }
  }

  tryToGenerateChild(
    parentId: number,
    childId: number,
    courseInfo: any,
    daySlotTimeSlotRoomNo: any,
    yearId: number,
    semesterId: number
  ) {
    this.clearRoutine(childId);
    const haveClassForTeacherMap = new Map<string, boolean>();
    const haveRoomMap = new Map<string, boolean>();
    for (let i = 0; i < this.numberOfDays; ++i) {
      for (let j = 0; j < this.finalData.years.length; j++) {
        const year = this.finalData.years[j];
        for (let k = 0; k < year.coursesBySemester.length; k++) {
          for (let l = 0; l < this.numberOfTimeSlots; ++l) {
            const info = this.routinesInfo[parentId][i][j][k][l];
            if (
              info.isFirstHour == true &&
              courseInfo.courseCode != info.courseCode
            ) {
              const teachers = info.teachers;
              this.insertDataIntoRoutine(
                childId,
                i,
                j,
                k,
                l,
                info.hoursPerClass,
                info,
                teachers,
                haveClassForTeacherMap,
                haveRoomMap,
                info.roomNo
              );
            }
          }
        }
      }
    }
    const hoursPerClass = courseInfo.hoursPerClass;
    const teachers = courseInfo.teachers;
    for (let i = 0; i < 50; ++i) {
      let indices: number[] = [];
      for (let i = 0; i < daySlotTimeSlotRoomNo.length / 2; ++i) {
        const index = this.getRandomInteger(
          0,
          daySlotTimeSlotRoomNo.length - 1
        );
        indices.push(index);
      }
      const unique = new Set(indices);
      if (unique.size !== indices.length) {
        continue;
      }
      const daySlotTimeSlotMap = new Map<string, boolean>();
      let isInsertable: boolean = true;
      for (let index of indices) {
        const key = `${daySlotTimeSlotRoomNo[index][0]}_${daySlotTimeSlotRoomNo[index][1]}`;
        if (daySlotTimeSlotMap.has(key)) {
          isInsertable = false;
          break;
        }
        daySlotTimeSlotMap.set(key, false);
      }
      if (!isInsertable) {
        continue;
      }
      for (let index of indices) {
        isInsertable = this.isSlotsFreeForStudent(
          childId,
          daySlotTimeSlotRoomNo[index][0],
          yearId,
          semesterId,
          daySlotTimeSlotRoomNo[index][1],
          hoursPerClass
        );
        if (!isInsertable) {
          break;
        }
        isInsertable = this.isSlotsFreeForTeacher(
          daySlotTimeSlotRoomNo[index][0],
          daySlotTimeSlotRoomNo[index][1],
          hoursPerClass,
          teachers,
          haveClassForTeacherMap
        );
        if (!isInsertable) {
          break;
        }
        const roomNo = daySlotTimeSlotRoomNo[index][2];
        isInsertable = this.isSlotsFreeForRoom(
          daySlotTimeSlotRoomNo[index][0],
          daySlotTimeSlotRoomNo[index][1],
          hoursPerClass,
          haveRoomMap,
          roomNo
        );
      }
      if (!isInsertable) {
        continue;
      }
      for (let index of indices) {
        this.insertDataIntoRoutine(
          childId,
          daySlotTimeSlotRoomNo[index][0],
          yearId,
          semesterId,
          daySlotTimeSlotRoomNo[index][1],
          hoursPerClass,
          courseInfo,
          teachers,
          haveClassForTeacherMap,
          haveRoomMap,
          daySlotTimeSlotRoomNo[index][2]
        );
      }
      this.isValidRoutineExistMp.set(childId, true);
      return;
    }
    this.isValidRoutineExistMp.set(childId, false);
  }

  getRandomInteger(start: number, end: number): number {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  getBestRoutine() {
    this.teacherConcat(this.routineIdFitness[0][0]);
    return this.routinesInfo[this.routineIdFitness[0][0]];
  }

  teacherConcat(routineId: number) {
    for (let i = 0; i < this.numberOfDays; ++i) {
      for (let j = 0; j < this.finalData.years.length; j++) {
        const year = this.finalData.years[j];
        for (let k = 0; k < year.coursesBySemester.length; k++) {
          for (let l = 0; l < this.numberOfTimeSlots; ++l) {
            const teachers = this.routinesInfo[routineId][i][j][k][l].teachers;
            const courseType =
              this.routinesInfo[routineId][i][j][k][l].courseType;
            let teachersConcat = '';
            for (let k = 0; k < teachers.length; ++k) {
              if (k > 0) {
                if (courseType == 'lab') {
                  teachersConcat += ',';
                } else {
                  teachersConcat += '/';
                }
              }
              teachersConcat += teachers[k].abbreviation;
            }
            this.routinesInfo[routineId][i][j][k][l].teachers = teachersConcat;
          }
        }
      }
    }
  }
}
