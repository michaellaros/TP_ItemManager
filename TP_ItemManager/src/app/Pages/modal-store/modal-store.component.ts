import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from 'src/app/Models/Store';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-store',
  templateUrl: './modal-store.component.html',
  styleUrls: ['./modal-store.component.scss'],
})
export class ModalStoreComponent {
  store?: Store;
  public flg_insert: boolean;

  storeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lRetailStoreID: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    ip_address: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Store,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.store = this.data;
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
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
          this._snackBar.open('Store successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      }
    }
  }

  GetStoreFromForm(): Store {
    return new Store(
      this.store?.id != undefined ? this.store.id : undefined,
      this.storeForm.get('name')!.value!,
      this.storeForm.get('lRetailStoreID')!.value!,
      this.storeForm.get('ip_address')!.value!
    );
  }

  UpdateForm() {
    console.log(JSON.stringify(this.store));
    if (this.store != null) {
      this.storeForm.patchValue({
        name: this.store.name,
        lRetailStoreID: this.store.lRetailStoreID!,
        ip_address: this.store.ip_address!,
      });
      console.log(JSON.stringify(this.store));
    }
  }
}
