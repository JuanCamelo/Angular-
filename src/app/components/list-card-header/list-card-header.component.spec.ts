import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardHeaderComponent } from './list-card-header.component';

describe('ListCardHeaderComponent', () => {
  let component: ListCardHeaderComponent;
  let fixture: ComponentFixture<ListCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
