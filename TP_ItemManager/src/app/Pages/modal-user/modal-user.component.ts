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
    name: new FormControl('', [Validators.required]),

  });
  password=new FormControl('', [Validators.required])

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: UserModelRequest,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.userU = data;

    }
  }
  ngOnInit() {
    this.UpdateForm();

  }




    UpdateForm() {
      if (this.userU != null) {
        this.userForm.patchValue({
          name: this.userU?.name

        });
        return new UserModelRequest(this.userU!.id!,this.userU!.name!)

      }else
      return new UserModelRequest('','')


    }

    public SubmitForm() {


      if (this.userU ==null) {
        if(this.password.valid) {

            this.http.CreateUser(this.userForm.get('name')!.value!,
            this.password.value!).subscribe((data) => {
              this._snackBar.open('User successfully created!', 'Ok');
            });
        }

        } else {
        this.http.UpdateUser(new UserModelRequest(this.userU?.id,this.userForm.get('name')!.value!)).subscribe((data) => {

            this._snackBar.open('User successfully updated!', 'Ok');
          });
        }

    }

}









