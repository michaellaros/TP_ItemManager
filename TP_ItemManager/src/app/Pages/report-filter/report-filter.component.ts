import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { Report } from 'src/app/Models/Report';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss'],
})
export class ReportFilterComponent {
  constructor(private http: HttpService, public status: StatusService) {}

  isToday(date: Date): boolean {
    const today = new Date();

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  isAfterToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    return compareDate > today;
  }

  isCurrentMonthOrAfter(date: Date): boolean {
    const now = new Date();

    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth(); // 0–11

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return (
      selectedYear > currentYear ||
      (selectedYear === currentYear && selectedMonth >= currentMonth)
    );
  }

  downloadReport(report: Report) {
    //reportName: string, date: Date | null | undefined) {
    if (!report.date) {
      alert('Please select a date first.');
      return;
    }

    //(this.isBeforeCurrentMonth(report.date) && report.isMonthOnly) ||
    if (
      !report.isMonthOnly &&
      ((this.isToday(report.date) && !report.allowTodayReport) ||
        this.isAfterToday(report.date))
    ) {
      alert('The report is not yet available for the selected date.');
      return;
    }

    if (report.isMonthOnly && this.isCurrentMonthOrAfter(report.date)) {
      alert('The report is not yet available for the selected date.');
      return;
    }

    const year = report.date.getFullYear();
    const month = String(report.date.getMonth() + 1).padStart(2, '0');
    const day = String(report.date.getDate()).padStart(2, '0');
    const formattedDate = report.isMonthOnly
      ? `${year}${month}`
      : `${year}${month}${day}`; // YYYYMMDD

    this.http
      .GenerateCSVReport(report.name!, formattedDate)
      .subscribe((blob: any) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formattedDate}_${report.name!}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
