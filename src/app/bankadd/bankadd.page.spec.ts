import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankaddPage } from './bankadd.page';

describe('BankaddPage', () => {
  let component: BankaddPage;
  let fixture: ComponentFixture<BankaddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BankaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
