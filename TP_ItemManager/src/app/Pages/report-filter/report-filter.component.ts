import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { Report } from 'src/app/Models/Report';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss'],
})
export class ReportFilterComponent {
  constructor(private http: HttpService, public status: StatusService) {}

  downloadReport(reportName: string, date: Date | null | undefined) {
    if (!date) {
      alert('Please select a date first.');
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`; // YYYYMMDD

    this.http
      .GenerateCSVReport(reportName, formattedDate)
      .subscribe((blob: any) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formattedDate}_${reportName}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
