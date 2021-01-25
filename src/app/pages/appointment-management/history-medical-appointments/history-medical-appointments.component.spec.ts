import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMedicalAppointmentsComponent } from './history-medical-appointments.component';

describe('HistoryMedicalAppointmentsComponent', () => {
  let component: HistoryMedicalAppointmentsComponent;
  let fixture: ComponentFixture<HistoryMedicalAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMedicalAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMedicalAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
