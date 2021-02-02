import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmaryEgressComponent } from './infirmary-egress.component';

describe('InfirmaryEgressComponent', () => {
  let component: InfirmaryEgressComponent;
  let fixture: ComponentFixture<InfirmaryEgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfirmaryEgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmaryEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
