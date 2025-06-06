import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenerateRoutineService {
  routinesInfo: any;
  breakPeriodTimeSlotIndex: number = 0;
  numberOfDays: number = 0;
  numberOfTimeSlots: number = 0;
  finalData: any;
  constructor(private helperService: HelperService) {}

  generateRoutines(
    breakPeriodTimeSlotIndex: number,
    daysInfo: string[],
    timeSlotsInfo: string[]
  ) {
    this.breakPeriodTimeSlotIndex = breakPeriodTimeSlotIndex;
    this.numberOfDays = daysInfo.length;
    this.numberOfTimeSlots = timeSlotsInfo.length;
    this.routinesInfo = Array.from({ length: 200 }, () =>
      Array.from({ length: 7 }, () =>
        Array.from({ length: 8 }, () =>
          Array.from(
            { length: 6 },
            () => Array.from({ length: 20 }, () => ({})) // Initialize as empty objects
          )
        )
      )
    );
    for (let i = 0; i < 200; ++i) {
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
    // this.routinesInfo[0][0][0][0][0].courseCode = this.finalData.years[0].coursesBySemester[0].courses[0].rooms[0];
    // this.routinesInfo[0][0][0][0][0].teachers = ["ab", "cd"];
    // this.routinesInfo[0][0][0][0][0].roomNo = [302];
  }

  generateInitialRoutines() {
    for (let routineId = 0; routineId < 100; ++routineId) {
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
            if (selectedRoom == "")
              isInsertable = false;
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
    let teachersConcat = '';
    for (let k = 0; k < teachers.length; ++k) {
      if (k > 0) {
        if (courseInfo.courseType == 'lab') {
          teachersConcat += ',';
        } else {
          teachersConcat += '/';
        }
      }
      teachersConcat += teachers[k].abbreviation;
    }
    for (let j = timeSlotId; j <= timeSlotId + hoursPerClass - 1; ++j) {
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].courseCode =
        courseInfo.courseCode;
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].roomNo =
        roomNo;
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].teachers =
        teachersConcat;
      this.routinesInfo[routineId][dayId][yearId][semesterId][j].isOccupied =
        true;
      if (j == timeSlotId) {
        this.routinesInfo[routineId][dayId][yearId][semesterId][j].isFirstHour =
          true;
      }
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
            this.routinesInfo[routineId][j][k][l][m].roomNo = '';
            this.routinesInfo[routineId][j][k][l][m].teachers = '';
            this.routinesInfo[routineId][j][k][l][m].isOccupied = false;
            this.routinesInfo[routineId][j][k][l][m].isFirstHour = false;
          }
        }
      }
    }
  }

  getRandomInteger(start: number, end: number): number {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  getBestRoutine() {
    console.log(this.routinesInfo);
    return this.routinesInfo[0];
  }
}
