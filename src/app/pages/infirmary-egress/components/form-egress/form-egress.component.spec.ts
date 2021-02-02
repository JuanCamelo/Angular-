import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEgressComponent } from './form-egress.component';

describe('FormEgressComponent', () => {
  let component: FormEgressComponent;
  let fixture: ComponentFixture<FormEgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
