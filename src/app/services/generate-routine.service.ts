import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateRoutineService {
  routinesInfo: any;
  breakPeriodTimeSlotIndex: number = 0;
  constructor(private helperService: HelperService) { }

  generateRoutines(breakPeriodTimeSlotIndex: number) {
    this.breakPeriodTimeSlotIndex = breakPeriodTimeSlotIndex;
    debugger;
    this.routinesInfo = Array.from({ length: 150 }, () =>
    Array.from({ length: 7 }, () =>
      Array.from({ length: 8 }, () =>
        Array.from({ length: 6 }, () =>
          Array.from({ length: 20 }, () => ({})) // Initialize as empty objects
        )
      )
    )
  );
    // this.routinesInfo[0][0][0][0][0].courseCode = "ice2221";
    // this.routinesInfo[0][0][0][0][0].teachers = ["ab", "cd"];
    // this.routinesInfo[0][0][0][0][0].roomNo = [302];
  }

  getBestRoutine() {
    return this.routinesInfo[0];
  }
}
