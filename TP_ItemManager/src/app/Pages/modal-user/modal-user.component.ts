import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Models/User';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { Role } from 'src/app/Models/Role';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent {
  public flg_insert: boolean;
  user?: User;
  isResetPassword: boolean = false;

  userForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    badge: new FormControl(''),
    vyUser: new FormControl(''),
    password: new FormControl(''),
  });

  passForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required]),
    confPass: new FormControl('', [Validators.required]),
  });

  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  public filteredRole?: Role[];

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.user = this.data || new User();
      this.flg_insert = this.data == null;
      this.userForm.get('vyUser')?.disable();
      this.userForm.get('badge')?.disable();
    }
  }
  ngOnInit() {
    this.UpdateForm();

    this.filteredRole = this.status.Roles;
    this.userForm
      .get('role')!
      .valueChanges.pipe(map((value) => this._filterRole(value || '')))
      .subscribe((data) => (this.filteredRole = data));
  }
  UpdateForm() {
    if (this.user != null) {
      let role = this.status.Roles.find(
        (x) => x.RoleAuthority == this.user?.role
      );
      console.log({
        id: this.user?.id,
        name: this.user?.name,
        role: role?.Role,
        badge: this.user.badge,
        vyUser: this.user.vyUser,
      });
      this.userForm.patchValue({
        id: this.user?.id,
        name: this.user?.name,
        role: role?.Role,
        badge: this.user.badge,
        vyUser: this.user.vyUser,
      });
    } else {
    }
  }

  _filterRole(value: string): Role[] {
    const filterValue = value.toLowerCase();

    return this.status.Roles.filter((role) =>
      role.Role?.toLowerCase().includes(filterValue)
    );
  }

  public ModifyPassword() {
    this.isResetPassword = !this.isResetPassword;
  }

  public SubmitForm() {
    if (this.isResetPassword) {
      this.SubmitFormPassword();
    } else {
      this.SubmitFormUser();
    }
  }

  public SubmitFormUser() {
    if (this.flg_insert) {
      if (
        this.password.value != null &&
        this.password.value === this.confirmPassword.value
      ) {
        this.http
          .CreateUser(this.GetUserFromForm(), this.password.value)
          .subscribe((data) => {
            this._snackBar.open('User successfully created!', 'Ok');
            this.user = data;
            this.flg_insert = false;
          });
      } else {
        this._snackBar.open('Passwords need to match', 'Ok', {
          duration: this.status.snackbarDuration,
        });
      }
    } else {
      this.http.UpdateUser(this.GetUserFromForm()).subscribe((data) => {
        this._snackBar.open('User successfully updated!', 'Ok', {
          duration: this.status.snackbarDuration,
        });
        this.user = data;
      });
    }
  }

  GetUserFromForm(): User {
    let role = this.status.Roles.find(
      (x) => x.Role == this.userForm.get('role')?.value
    );
    return new User(
      this.user?.id != undefined ? this.user.id : undefined,
      this.userForm.get('name')!.value!,
      role?.RoleAuthority,
      this.userForm.get('badge')!.value!,
      this.userForm.get('vyUser')!.value!
    );
  }

  ErrorSnack() {
    this._snackBar.open('Old password is not correct', 'Ok', {
      duration: this.status.snackbarDuration,
    });
  }
  SubmitFormPassword() {
    if (
      this.passForm.get('oldPass')?.value !=
        this.passForm.get('newPass')?.value &&
      this.passForm.get('oldPass')?.value !=
        this.passForm.get('confPass')?.value &&
      this.passForm.get('newPass')?.value ===
        this.passForm.get('confPass')?.value
    ) {
      let newpassword = this.passForm.get('confPass')!.value!;
      let oldPass = this.passForm.get('oldPass')!.value!;
      this.http
        .UpdatePassword(this.user?.id!, newpassword, oldPass)
        .subscribe((data) => {
          this._snackBar.open('Password successfully Update!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
          this.isResetPassword = false;
        });
    } else {
      this._snackBar.open('Passwords need to match!', 'Ok', {
        duration: this.status.snackbarDuration,
      });
    }
  }

  readCard() {
    this.http.ReadBadge().subscribe((res: any) => {
      console.log('Card Detected:', res);
      this.userForm.get('badge')?.setValue(res.badge);
    });
  }
}
