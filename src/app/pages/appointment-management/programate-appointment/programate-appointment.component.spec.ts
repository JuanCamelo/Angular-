import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramateAppointmentComponent } from './programate-appointment.component';

describe('ProgramateAppointmentComponent', () => {
  let component: ProgramateAppointmentComponent;
  let fixture: ComponentFixture<ProgramateAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramateAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
