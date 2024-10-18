import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/app/Models/Menu';
import { Store } from 'src/app/Models/Store';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss'],
})
export class ModalMenuComponent {
  menu?: Menu;
  public flg_insert: boolean;

  storeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Store,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.menu = this.data;
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
  }

  public SubmitForm() {
    if (this.storeForm.valid) {
      if (this.flg_insert) {
        this.http.InsertMenu(this.GetMenuFromForm()).subscribe((data) => {
          this.menu = data;
          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Menu successfully created!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      } else {
        this.http.UpdateMenu(this.GetMenuFromForm()).subscribe((data) => {
          this.menu = data;
          this.UpdateForm();
          this._snackBar.open('Menu successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      }
    }
  }

  GetMenuFromForm(): Store {
    return new Store(
      this.menu?.id != undefined ? this.menu.id : undefined,
      this.storeForm.get('name')!.value!
    );
  }

  UpdateForm() {
    console.log(JSON.stringify(this.menu));
    if (this.menu != null) {
      this.storeForm.patchValue({
        name: this.menu.name,
      });
      console.log(JSON.stringify(this.menu));
    }
  }
}
