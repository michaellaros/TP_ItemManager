import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, map } from 'rxjs';
import { Device } from 'src/app/Models/Device';
import { Kiosk } from 'src/app/Models/Kiosk';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-device',
  templateUrl: './modal-device.component.html',
  styleUrls: ['./modal-device.component.scss'],
})
export class ModalDeviceComponent {
  device?: Device;
  public flg_insert: boolean;

  public stores: SearchedObject[] = [];
  public filteredStores?: SearchedObject[];

  public menus: SearchedObject[] = [];
  public filteredMenus?: SearchedObject[];

  deviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    androidId: new FormControl('', [Validators.required]),
    szWorkstationID: new FormControl(''),
    store_id: new FormControl(),
    active_menu_id: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Device,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.device = this.data;
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    const storeObservable = this.http.FilterStore({});
    const menuObservable = this.http.FilterMenu({});
    forkJoin([storeObservable, menuObservable]).subscribe(
      ([storeData, menuData]) => {
        this.stores = this.MapToArray(storeData);
        this.filteredStores = this.stores;
        this.menus = this.MapToArray(menuData);
        this.filteredMenus = this.menus;
        this.UpdateForm();
      }
    );

    this.deviceForm
      .get('store_id')!
      .valueChanges.pipe(map((value) => this._filterStore(value || '')))
      .subscribe((data) => (this.filteredStores = data));
    this.deviceForm
      .get('active_menu_id')!
      .valueChanges.pipe(map((value) => this._filterMenu(value || '')))
      .subscribe((data) => (this.filteredMenus = data));
  }

  public SubmitForm() {
    const storeId = this.stores.find(
      (store) => store.name == this.deviceForm.get('store_id')!.value!
    )?.id;

    if (storeId == null) {
      this._snackBar.open('Select a valid store!', 'Ok');
    }

    const menuId = this.menus.find(
      (menu) => menu.name == this.deviceForm.get('active_menu_id')!.value!
    )?.id;

    if (menuId == null) {
      this._snackBar.open('Select a valid menu!', 'Ok');
    }
    if (this.deviceForm.valid && storeId != null && menuId != null) {
      let device = this.GetDeviceFromForm();
      device.store_id = Number.parseInt(storeId!);
      device.active_menu_id = Number.parseInt(menuId!);
      if (this.flg_insert) {
        this.http.InsertDevice(device).subscribe((data) => {
          this.device = data;
          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Device successfully created!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      } else {
        this.http.UpdateDevice(device).subscribe((data) => {
          this.device = data;
          this.UpdateForm();
          this._snackBar.open('Device successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      }
    }
  }

  GetDeviceFromForm(): Device {
    return new Device(
      this.device?.id != undefined ? this.device.id : undefined,
      this.deviceForm.get('name')!.value!,
      this.deviceForm.get('androidId')!.value!,
      this.deviceForm.get('szWorkstationID')!.value!,
      this.deviceForm.get('store_id')!.value!,
      this.deviceForm.get('active_menu_id')!.value!
    );
  }

  UpdateForm() {
    console.log(JSON.stringify(this.device));

    if (this.device != null) {
      const storeName = this.stores.find(
        (store) => store.id! == this.device!.store_id!.toString()
      )?.name;

      const menuName = this.menus.find(
        (menu) => menu.id! == this.device!.active_menu_id!.toString()
      )?.name;

      this.deviceForm.patchValue({
        name: this.device.name,
        androidId: this.device.androidId!,
        szWorkstationID: this.device.szWorkstationID!,
        store_id: storeName,
        active_menu_id: menuName,
      });
      console.log(JSON.stringify(this.device));
    }
  }

  _filterStore(value: string): SearchedObject[] {
    const filterValue = value.toLowerCase();

    return this.stores.filter((option) =>
      option.name?.toLowerCase().includes(filterValue)
    );
  }

  _filterMenu(value: string): SearchedObject[] {
    const filterValue = value.toLowerCase();

    return this.menus.filter((option) =>
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
}
