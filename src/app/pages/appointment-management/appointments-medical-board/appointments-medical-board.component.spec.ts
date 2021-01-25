import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsMedicalBoardComponent } from './appointments-medical-board.component';

describe('AppointmentsMedicalBoardComponent', () => {
  let component: AppointmentsMedicalBoardComponent;
  let fixture: ComponentFixture<AppointmentsMedicalBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsMedicalBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsMedicalBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
