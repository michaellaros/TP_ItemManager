import { Component, Input } from '@angular/core';
import { Report } from 'src/app/Models/Report';

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-report-month-picker',
  templateUrl: './report-month-picker.component.html',
  styleUrls: ['./report-month-picker.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ReportMonthPickerComponent {
  @Input() report!: Report;

  setMonthAndYear(
    normalizedMonthAndYear: _moment.Moment,
    datepicker: MatDatepicker<_moment.Moment>,
    report: Report
  ) {
    if (!report.isMonthOnly) return;
    // Start from existing report.date or today
    const m = report.date ? moment(report.date) : moment();

    // Set month & year
    m.month(normalizedMonthAndYear.month());
    m.year(normalizedMonthAndYear.year());

    // Save back as Date
    report.date = m.toDate();

    datepicker.close();
  }
}
