import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from 'src/app/Models/Device';
import { Kiosk } from 'src/app/Models/Kiosk';
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

  deviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    macAddress: new FormControl('', [Validators.required]),
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
    this.UpdateForm();
  }

  public SubmitForm() {
    if (this.deviceForm.valid) {
      if (this.flg_insert) {
        this.http.InsertDevice(this.GetDeviceFromForm()).subscribe((data) => {
          this.device = data;
          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Device successfully created!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      } else {
        this.http.UpdateDevice(this.GetDeviceFromForm()).subscribe((data) => {
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
      this.deviceForm.get('macAddress')!.value!,
      this.deviceForm.get('szWorkstationID')!.value!,
      this.deviceForm.get('store_id')!.value!,
      this.deviceForm.get('Active_menu_id')!.value!
    );
  }

  UpdateForm() {
    console.log(JSON.stringify(this.device));
    if (this.device != null) {
      this.deviceForm.patchValue({
        name: this.device.name,
        macAddress: this.device.macAddress!,
        szWorkstationID: this.device.szWorkstationID!,
        store_id: this.device.store_id!,
        active_menu_id: this.device.active_menu_id!,
      });
      console.log(JSON.stringify(this.device));
    }
  }
}
