import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/Models/Country';
import { Kiosk } from 'src/app/Models/Kiosk';
import { Store } from 'src/app/Models/Store';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-country',
  templateUrl: './modal-country.component.html',
  styleUrls: ['./modal-country.component.scss'],
})
export class ModalCountryComponent {
  public country?: Country;
  public flg_insert: boolean;
  public flg_hasChanges: boolean = false;

  countryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Country,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    public storage: StorageManagerService
  ) {
    {
      this.country = this.data;
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
    if (!this.storage.CheckPermission(this.storage.CountryManagerPermission)) {
      this.countryForm.get('name')?.disable();
    }
  }

  public SubmitForm() {
    if (this.countryForm.valid) {
      this.flg_hasChanges = true;
      if (this.flg_insert) {
        this.http.InsertCountry(this.GetCountryFromForm()).subscribe((data) => {
          this.country = data;
          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Country successfully created!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      } else {
        this.http.UpdateCountry(this.GetCountryFromForm()).subscribe((data) => {
          this.country = data;
          this.UpdateForm();
          this._snackBar.open('Country successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      }
    }
  }

  GetCountryFromForm(): Country {
    return new Country(
      this.country?.id != undefined ? this.country.id : undefined,
      this.countryForm.get('name')!.value!
    );
  }

  UpdateForm() {
    if (this.country != null) {
      this.countryForm.patchValue({
        name: this.country.name,
      });
    }
  }
}
