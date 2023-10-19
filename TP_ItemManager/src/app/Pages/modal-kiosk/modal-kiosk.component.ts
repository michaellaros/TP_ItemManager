import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kiosk } from 'src/app/Models/Kiosk';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalOptionComponent } from '../modal-option/modal-option.component';
import { Store } from 'src/app/Models/Store';
import { ForceReplicationModel } from 'src/app/Models/ForceReplicationModel';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';

@Component({
  selector: 'app-modal-kiosk',
  templateUrl: './modal-kiosk.component.html',
  styleUrls: ['./modal-kiosk.component.scss'],
})
export class ModalKioskComponent {
  kiosk?: Kiosk;

  public flg_insert: boolean;

  kioskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ip: new FormControl('', [Validators.required]),
    store_name: new FormControl(''),
    store_id: new FormControl(''),
    flg_consumations: new FormControl(true),
    last_request_date: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { kiosk: Kiosk; store: Store },
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    public storage:StorageManagerService
  ) {
    {
      this.kiosk = data.kiosk;
      if (data.store != null)
        this.kioskForm.patchValue({ store_name: data.store.name });
      this.flg_insert = data.kiosk == null;

      this.kioskForm.get('store_name')!.disable();
      this.kioskForm.get('last_request_date')!.disable();
    }
  }

  ngOnInit() {
    this.UpdateForm();
    if (!this.storage.CheckPermission(this.storage.userPermission)) {
      this.kioskForm.get('name')?.disable();
      this.kioskForm.get('ip')?.disable();
      this.kioskForm.get('store_name')?.disable();
      this.kioskForm.get('flg_consumations')?.disable();



    }

  }

  ForceReplication(id: string) {
    this.http.ForceKioskReplication(id).subscribe(() => {
      this.kioskForm.get('last_request_date')!.setValue(null);
    });
  }

  public SubmitForm() {
    if (this.kioskForm.valid) {
      if (this.flg_insert) {
        this.http.InsertKiosk(this.GetKioskFromForm()).subscribe((data) => {
          this.kiosk = data;
          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Kiosk successfully created!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      } else {
        console.log(this.GetKioskFromForm());
        this.http.UpdateKiosk(this.GetKioskFromForm()).subscribe((data) => {
          this.kiosk = data;
          this.UpdateForm();
          this._snackBar.open('Kiosk successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      }
    }
  }

  GetKioskFromForm(): Kiosk {
    return new Kiosk(
      this.kiosk?.id != undefined ? this.kiosk.id : undefined,
      this.kioskForm.get('name')!.value!,
      this.kioskForm.get('ip')!.value!,
      undefined, //name
      this.flg_insert
        ? this.data.store.id
        : this.kioskForm.get('store_id')!.value!,
      this.kioskForm.get('flg_consumations')!.value!
    );
  }

  UpdateForm() {
    console.log(this.kiosk);
    if (this.kiosk != null) {
      this.kioskForm.patchValue({
        name: this.kiosk.name,
        ip: this.kiosk.ip!,
        store_name: this.kiosk.store_name,
        store_id: this.kiosk.store_id,
        flg_consumations: this.kiosk.flg_consumations!,
        last_request_date: this.kiosk.last_request_date!,
      });
      console.log({
        name: this.kiosk.name,
        ip: this.kiosk.ip!,
        store_name: this.kiosk.store_name,
        store_id: this.kiosk.store_id,
        flg_consumations: this.kiosk.flg_consumations!,
        last_request_date: this.kiosk.last_request_date!,
      });
    }
  }
}
