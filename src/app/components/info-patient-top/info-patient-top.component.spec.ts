import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPatientTopComponent } from './info-patient-top.component';

describe('InfoPatientTopComponent', () => {
  let component: InfoPatientTopComponent;
  let fixture: ComponentFixture<InfoPatientTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPatientTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPatientTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
