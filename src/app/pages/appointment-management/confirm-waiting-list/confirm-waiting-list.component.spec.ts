import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWaitingListComponent } from './confirm-waiting-list.component';

describe('ConfirmWaitingListComponent', () => {
  let component: ConfirmWaitingListComponent;
  let fixture: ComponentFixture<ConfirmWaitingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmWaitingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmWaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
