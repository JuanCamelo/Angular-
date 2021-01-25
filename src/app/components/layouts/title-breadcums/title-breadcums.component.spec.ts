import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBreadcumsComponent } from './title-breadcums.component';

describe('TitleBreadcumsComponent', () => {
  let component: TitleBreadcumsComponent;
  let fixture: ComponentFixture<TitleBreadcumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleBreadcumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleBreadcumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
