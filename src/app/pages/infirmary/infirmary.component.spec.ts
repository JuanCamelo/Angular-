import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmaryComponent } from './infirmary.component';

describe('InfirmaryComponent', () => {
  let component: InfirmaryComponent;
  let fixture: ComponentFixture<InfirmaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfirmaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
