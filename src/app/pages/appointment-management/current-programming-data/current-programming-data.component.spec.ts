import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProgrammingDataComponent } from './current-programming-data.component';

describe('CurrentProgrammingDataComponent', () => {
  let component: CurrentProgrammingDataComponent;
  let fixture: ComponentFixture<CurrentProgrammingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentProgrammingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentProgrammingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
