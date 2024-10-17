import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalKioskComponent } from '../modal-kiosk/modal-kiosk.component';
import { ModalDeviceComponent } from '../modal-device/modal-device.component';

@Component({
  selector: 'app-device-filter',
  templateUrl: './device-filter.component.html',
  styleUrls: ['./device-filter.component.scss'],
})
export class DeviceFilterComponent {
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
    this.GetDevices();
  }
  ResetForm() {
    this.filterForm.reset();
    this.GetDevices();
  }

  GetDevices() {
    let Id =
      this.filterForm.get('Id')?.value != undefined
        ? this.filterForm.get('Id')?.value!
        : '';
    let NameWorkstation =
      this.filterForm.get('NameWorkstation')?.value != undefined
        ? this.filterForm.get('NameWorkstation')?.value!
        : '';
    let Store =
      this.filterForm.get('Store')?.value != undefined
        ? this.filterForm.get('Store')?.value!
        : '';

    let list: SearchedObject[] = [];

    this.http
      .FilterDevice({ Id: Id, NameWorkstation: NameWorkstation, Store: Store })
      .subscribe((data) => {
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
  OpenDialogAddDevice() {
    const dialogRef = this.dialog.open(ModalDeviceComponent, {
      minWidth: '100%',
      height: '100%',
    });
    dialogRef.afterClosed().subscribe(() => this.GetDevices());
  }
}
