import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OptionFilterModel } from 'src/app/Models/OptionFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalOptionComponent } from '../modal-option/modal-option.component';
import { ModalKioskComponent } from '../modal-kiosk/modal-kiosk.component';

@Component({
  selector: 'app-kiosk-filter',
  templateUrl: './kiosk-filter.component.html',
  styleUrls: ['./kiosk-filter.component.scss'],
})
export class KioskFilterComponent {
  public list!: SearchedObject[];
  filterForm = new FormGroup({
    hostname: new FormControl(''),
    ip: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.GetKiosks();

  }
  ResetForm(){
    this.filterForm.reset();
    this.GetKiosks();
  }

  GetKiosks() {
    let hostname =
      this.filterForm.get('hostname')?.value != undefined
        ? this.filterForm.get('hostname')?.value!
        : '';
    let ip =
      this.filterForm.get('ip')?.value != undefined
        ? this.filterForm.get('ip')?.value!
        : '';

    let list: SearchedObject[] = [];

    this.http.FilterKiosk({ Hostname: hostname, IP: ip }).subscribe((data) => {
      if (data == null) {
        this.list = [];
      } else {
        Object.keys(data).forEach((key) => {
          list.push(new SearchedObject(key, data[key]));
        });
        this.list = list;
      }
    });
  }
  OpenDialogAddKiosk() {
    const dialogRef = this.dialog.open(ModalKioskComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => this.GetKiosks());
  }
}
