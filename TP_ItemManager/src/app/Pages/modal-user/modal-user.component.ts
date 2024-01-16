import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModelResult } from 'src/app/Models/UserModelRequest';
import { UserModelCreate } from 'src/app/Models/UserModelCreate';

import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { NavigationExtras, Router } from '@angular/router';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';

interface valueType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent {
  userC?: UserModelCreate;
  userU?: UserModelResult;
  public flg_insert: boolean;

  roleType: valueType[] = [
    { value: '100', viewValue: 'User' },
    { value: '999', viewValue: 'Admin' },
  ];

  userForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: UserModelResult,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    public storage: StorageManagerService
  ) {
    {
      this.userU = data;
      this.flg_insert = this.data == null;
    }
  }
  ngOnInit() {
    console.log(this.storage.getRole());
    this.UpdateForm();
    if (!this.storage.CheckPermission(this.storage.userPermission)) {
      this.userForm.get('role')?.disable();
    }
    console.log(this.userU);
  }

  UpdateForm() {
    if (this.userU != null) {
      this.userForm.patchValue({
        id: this.userU?.id,
        name: this.userU?.name,
        role: this.userU.role!,
      });
    } else {
    }
  }
  public ModifyPasswordButtonCheck(): boolean {
    if (this.storage.getRole() != '999') {
      if (this.storage.getId() != this.userU!.id) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  public ModifyPassword() {
    this.status.user = this.userU?.id!;
    this.router.navigate(['/modify-password']);
  }
  public SubmitForm() {
    if (this.flg_insert) {
      if (
        this.password.value != null &&
        this.password.value === this.confirmPassword.value
      ) {
        this.http
          .CreateUser(
            this.userForm.get('name')!.value!,
            this.password.value,
            this.userForm.get('role')!.value!.toString()
          )
          .subscribe((data) => {
            this._snackBar.open('User successfully created!', 'Ok');

            this.userU = data;
            this.flg_insert = false;
          });
      } else {
        this._snackBar.open('Passwords need to match', 'Ok', {
          duration: this.status.snackbarDuration,
        });
      }
    } else {
      this.http
        .UpdateUser(
          new UserModelResult(
            this.userU?.id,
            this.userForm.get('name')!.value!,
            this.userForm.get('role')!.value!
          )
        )
        .subscribe((data) => {
          this._snackBar.open('User successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
    }
  }
}
