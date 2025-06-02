import { GenerateRoutineService } from './../services/generate-routine.service';
import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-routine',
  imports: [],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.scss',
})
export class RoutineComponent {
  daysInfo: string[] = [];
  yearsSemestersInfo: any[] = [];
  timeSlotsInfo: string[] = [];
  bestRoutine: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private helperService: HelperService,
    private generateRoutineService: GenerateRoutineService
  ) {
    this.daysInfo = data.daysInfo;
    this.yearsSemestersInfo = data.yearsSemestersInfo;
    this.timeSlotsInfo = data.timeSlotsInfo;
    this.bestRoutine = data.bestRoutine;
    debugger;
  }

  ngOnInit(): void {
  }
}
