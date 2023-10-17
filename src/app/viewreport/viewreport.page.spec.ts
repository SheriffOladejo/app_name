import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewreportPage } from './viewreport.page';

describe('ViewreportPage', () => {
  let component: ViewreportPage;
  let fixture: ComponentFixture<ViewreportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
