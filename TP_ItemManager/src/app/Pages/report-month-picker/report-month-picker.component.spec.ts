import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMonthPickerComponent } from './report-month-picker.component';

describe('ReportMonthPickerComponent', () => {
  let component: ReportMonthPickerComponent;
  let fixture: ComponentFixture<ReportMonthPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportMonthPickerComponent]
    });
    fixture = TestBed.createComponent(ReportMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
