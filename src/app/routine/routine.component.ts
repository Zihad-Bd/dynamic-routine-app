import { GenerateRoutineService } from './../services/generate-routine.service';
import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routine',
  imports: [CommonModule],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.scss',
})
export class RoutineComponent {
  universityName: string = '';
  departmentName: string = '';
  daysInfo: string[] = [];
  yearsSemestersInfo: any[] = [];
  timeSlotsInfo: string[] = ['23', '33'];
  selectedRoutine: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private helperService: HelperService,
    private generateRoutineService: GenerateRoutineService
  ) {
    this.universityName = data.universityName;
    this.departmentName = data.departmentName;
    this.daysInfo = data.daysInfo;
    this.yearsSemestersInfo = data.yearsSemestersInfo;
    this.timeSlotsInfo = data.timeSlotsInfo;
    this.selectedRoutine = data.bestRoutine;
  }

  ngOnInit(): void {}
  getTimeSlotWidth(
    dayId: number,
    yearId: number,
    semesterId: number,
    timeSlotId: number
  ) {
    let hourPerClass =
      this.selectedRoutine[dayId][yearId][semesterId][timeSlotId].hourPerClass;
    const width = hourPerClass * 120 + hourPerClass - 1;
    return { width: `${width}px` };
  }
}
