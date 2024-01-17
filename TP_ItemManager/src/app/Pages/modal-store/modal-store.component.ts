import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreDetail } from 'src/app/Models/StoreDetail';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseStoreUpdate } from 'src/app/Models/ResponseStoreUpdate';
import { StoreModel } from 'src/app/Models/StoreModel';

@Component({
  selector: 'app-modal-store',
  templateUrl: './modal-store.component.html',
  styleUrls: ['./modal-store.component.scss'],
})
export class ModalStoreComponent {
  store?: StoreDetail;
  public flg_insert: boolean;
  public flg_hasChanges: boolean = false;

  storeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    store_ip: new FormControl('', [Validators.required]),
    // store_id: new FormControl('', [Validators.required]),
    lRetailStoreID: new FormControl('', [Validators.required]),
    last_request_date: new FormControl(''),
    country_name: new FormControl(''),
    country_id: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: StoreDetail,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public storage: StorageManagerService
  ) {
    {
      this.flg_insert = this.data.name == null;

      this.store = this.data;
      this.storeForm.get('last_request_date')!.disable();
      this.storeForm.get('country_name')!.disable();
    }
  }

  ngOnInit() {
    this.UpdateForm();
    if (!this.storage.CheckPermission(this.storage.userPermission)) {
      this.storeForm.get('name')?.disable();
      this.storeForm.get('store_ip')?.disable();
      this.storeForm.get('lRetailStoreID')?.disable();
    }
  }

  ForceReplication(id: string) {
    this.http.ForceStoreReplication(id).subscribe(() => {
      this.storeForm.get('last_request_date')!.setValue(null);
    });
    this.UpdateStores(id);
  }

  UpdateStores(id: string) {
    this.spinner.show();
    this.http.StoreUpdate(id).subscribe(
      (data) => {
        this.spinner.hide();
        if (data.length > 0) {
          this.OpenDialogReturnError(data);
        } else {
          this._snackBar.open('Store data successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        }
        this.http.GetStore(this.store?.id!).subscribe((data) => {
          this.storeForm.patchValue({
            last_request_date: data.last_request_date,
          });
        });
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  OpenDialogReturnError(errors: ResponseStoreUpdate[]) {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      data: errors,
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  public SubmitForm() {
    if (this.storeForm.valid) {
      this.flg_hasChanges = true;
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

  GetStoreFromForm(): StoreDetail {
    return new StoreDetail(
      this.store?.id != undefined ? this.store.id : undefined,
      this.storeForm.get('name')!.value!,
      this.storeForm.get('store_ip')!.value!,
      this.storeForm.get('lRetailStoreID')!.value!,
      this.storeForm.get('last_request_date')!.value!,
      this.storeForm.get('country_name')!.value!,
      this.storeForm.get('country_id')!.value!
    );
  }

  UpdateForm() {
    if (this.store != null) {
      this.storeForm.patchValue({
        name: this.store.name,
        store_ip: this.store.store_ip!,
        lRetailStoreID: this.store.lRetailStoreID!,
        last_request_date: this.store.last_request_date!,
        country_name: this.store.country_name!,
        country_id: this.store.country_id!,
      });
    }
  }
}
