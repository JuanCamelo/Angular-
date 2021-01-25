import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExamAdminComponent } from './physical-exam-admin.component';

describe('PhysicalExamAdminComponent', () => {
  let component: PhysicalExamAdminComponent;
  let fixture: ComponentFixture<PhysicalExamAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalExamAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalExamAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
