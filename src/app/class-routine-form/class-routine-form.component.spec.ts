import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoutineFormComponent } from './class-routine-form.component';

describe('ClassRoutineFormComponent', () => {
  let component: ClassRoutineFormComponent;
  let fixture: ComponentFixture<ClassRoutineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassRoutineFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassRoutineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
