import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankPage } from './bank.page';

describe('BankPage', () => {
  let component: BankPage;
  let fixture: ComponentFixture<BankPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
