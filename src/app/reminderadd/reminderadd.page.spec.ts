import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReminderaddPage } from './reminderadd.page';

describe('ReminderaddPage', () => {
  let component: ReminderaddPage;
  let fixture: ComponentFixture<ReminderaddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReminderaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
