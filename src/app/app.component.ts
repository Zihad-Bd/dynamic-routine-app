import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClassRoutineFormComponent } from "./class-routine-form/class-routine-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClassRoutineFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dynamic-Routine';
}
