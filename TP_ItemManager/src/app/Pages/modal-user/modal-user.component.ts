import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModelRequest } from 'src/app/Models/UserModelRequest';
import { UserModelCreate } from 'src/app/Models/UserModelCreate';

import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent {
  userC?: UserModelCreate;
  userU?: UserModelRequest;

  userForm = new FormGroup({
    id:new FormControl(''),
    name: new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: UserModelCreate,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.userC = this.data;
    }
  }
  ngOnInit() {
    this.UpdateForm();
  }

  GetUserFromFormCreate(): UserModelCreate {
    return new UserModelCreate(
      this.userForm.get('name')!.value!,
      this.userForm.get('password')!.value!

    );
  }


    UpdateForm() {
      console.log(this.userU);
      if (this.userU != null) {
        this.userForm.patchValue({
          name: this.userU?.name,
          id:this.userU?.id

        });
        console.log({
          name: this.userU?.name,
          id:this.userU?.id

        });
      }
      return new UserModelRequest(this.userU!.id!,this.userU!.name!)

    }

    public SubmitForm() {
      if (this.userU?.name != null) {
        if (true) {
          this.http.CreateUser(this.GetUserFromFormCreate()).subscribe((data) => {

            this._snackBar.open('User successfully created!', 'Ok');
          });
        } else {
        this.http.UpdateUser(this.UpdateForm()!).subscribe((data) => {
            this.userU = data;
            this.UpdateForm();
            this._snackBar.open('Kiosk successfully updated!', 'Ok');
          });
        }
      }
    }

}









