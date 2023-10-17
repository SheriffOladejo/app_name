import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoaladdPage } from './goaladd.page';

describe('GoaladdPage', () => {
  let component: GoaladdPage;
  let fixture: ComponentFixture<GoaladdPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoaladdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
