import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kiosk } from 'src/app/Models/Kiosk';
import { Store } from 'src/app/Models/Store';
import { StoreDetail } from 'src/app/Models/StoreDetail';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-store',
  templateUrl: './modal-store.component.html',
  styleUrls: ['./modal-store.component.scss'],
})
export class ModalStoreComponent {
  store?: StoreDetail;
  public flg_insert: boolean;

  storeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    store_ip: new FormControl('', [Validators.required]),
    // store_id: new FormControl('', [Validators.required]),
    lRetailStoreID: new FormControl('', [Validators.required]),
    last_request_date: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: StoreDetail,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.store = this.data;
      this.flg_insert = this.data == null;
      this.storeForm.get('last_request_date')!.disable();
    }
  }

  ngOnInit() {
    this.UpdateForm();
  }

  ForceReplication(id: string) {
    this.http.ForceStoreReplication(id).subscribe(() => {
      this.storeForm.get('last_request_date')!.setValue(null);
    });
  }

  public SubmitForm() {
    if (this.storeForm.valid) {
      if (this.flg_insert) {
        this.http.InsertStore(this.GetStoreFromForm()).subscribe((data) => {
          this.store = data;
          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Store successfully created!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      } else {
        this.http.UpdateStore(this.GetStoreFromForm()).subscribe((data) => {
          this.store = data;
          this.UpdateForm();
          this._snackBar.open('Kiosk successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      }
    }
  }

  GetStoreFromForm(): StoreDetail {
    return new StoreDetail(
      this.store?.id != undefined ? this.store.id : undefined,
      this.storeForm.get('name')!.value!,
      this.storeForm.get('store_ip')!.value!,
      this.storeForm.get('lRetailStoreID')!.value!,
      this.storeForm.get('last_request_date')!.value!
    );
  }

  UpdateForm() {
    console.log(this.store);
    if (this.store != null) {
      this.storeForm.patchValue({
        name: this.store.name,
        store_ip: this.store.store_ip!,
        lRetailStoreID: this.store.lRetailStoreID!,
        last_request_date: this.store.last_request_date!,
      });
      console.log({
        name: this.store.name,
        store_ip: this.store.store_ip!,
        lRetailStoreID: this.store.lRetailStoreID!,
        last_request_date: this.store.last_request_date!,
      });
    }
  }
}