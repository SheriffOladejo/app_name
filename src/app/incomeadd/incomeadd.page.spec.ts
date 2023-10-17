import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncomeaddPage } from './incomeadd.page';

describe('IncomeaddPage', () => {
  let component: IncomeaddPage;
  let fixture: ComponentFixture<IncomeaddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IncomeaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
