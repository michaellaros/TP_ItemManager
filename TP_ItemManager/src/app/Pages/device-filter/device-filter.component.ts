import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalKioskComponent } from '../modal-kiosk/modal-kiosk.component';
import { ModalDeviceComponent } from '../modal-device/modal-device.component';
import { map } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-device-filter',
  templateUrl: './device-filter.component.html',
  styleUrls: ['./device-filter.component.scss'],
})
export class DeviceFilterComponent {
  public list!: SearchedObject[];
  filterForm = new FormGroup({
    Id: new FormControl(''),
    NameWorkstation: new FormControl(''),
    Store_id: new FormControl(''),
  });

  public stores: SearchedObject[] = [];
  public filteredStores?: SearchedObject[];

  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.GetDevices();
    this.http.FilterStore({}).subscribe((data) => {
      this.stores = this.MapToArray(data);
      this.filteredStores = this.stores;
    });

    this.filterForm
      .get('Store_id')!
      .valueChanges.pipe(map((value) => this._filterStore(value || '')))
      .subscribe((data) => (this.filteredStores = data));
  }

  _filterStore(value: string): SearchedObject[] {
    const filterValue = value.toLowerCase();

    return this.stores.filter((option) =>
      option.name?.toLowerCase().includes(filterValue)
    );
  }

  MapToArray(map: any): SearchedObject[] {
    let list: SearchedObject[] = [];
    Object.keys(map).forEach((key) => {
      list.push(new SearchedObject(key, map[key]));
    });
    return list.sort((a, b) => (a.name! < b.name! ? -1 : 1));
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

    const id = this.stores.find(
      (store) => store.name == this.filterForm.get('Store_id')!.value!
    )?.id;

    if (this.filterForm.get('Store_id')!.value && id == null) {
      this._snackBar.open('Select a valid store!', 'Ok');
      return;
    }

    // let Store =
    //   this.filterForm.get('Store_id')?.value != undefined
    //     ? this.filterForm.get('Store_id')?.value!
    //     : null;

    let list: SearchedObject[] = [];

    this.http
      .FilterDevice({
        Id: Id,
        NameWorkstation: NameWorkstation,
        Store_id: id,
      })
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
