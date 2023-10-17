import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransPage } from './trans.page';

describe('TransPage', () => {
  let component: TransPage;
  let fixture: ComponentFixture<TransPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
