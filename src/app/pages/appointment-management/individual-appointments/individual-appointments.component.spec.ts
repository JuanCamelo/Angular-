import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAppointmentsComponent } from './individual-appointments.component';

describe('IndividualAppointmentsComponent', () => {
  let component: IndividualAppointmentsComponent;
  let fixture: ComponentFixture<IndividualAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
