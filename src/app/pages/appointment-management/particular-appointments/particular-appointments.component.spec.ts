import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularAppointmentsComponent } from './particular-appointments.component';

describe('ParticularAppointmentsComponent', () => {
  let component: ParticularAppointmentsComponent;
  let fixture: ComponentFixture<ParticularAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticularAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
