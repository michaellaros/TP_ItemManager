import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModelRequest } from 'src/app/Models/UserModelRequest';
import { UserModelCreate } from 'src/app/Models/UserModelCreate';

import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent {
  userC?: UserModelCreate;
  userU?: UserModelRequest;

  userForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),

  });
  password=new FormControl('', [Validators.required])
  confirmPassword=new FormControl('', [Validators.required])

  constructor(private router:Router,
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
          id:this.userU?.id,
          name: this.userU?.name
        });
      }else{}
    }
    public ModifyPassword(){
      this.status.user = this.userU?.id!
      this.router.navigate(['/modify-password']);

    }
    public SubmitForm() {
      if (this.userU==null) {
        if(this.password.value!= null && this.password.value === this.confirmPassword.value )
        {
            this.http.CreateUser(this.userForm.get('name')!.value!,
            this.password.value).subscribe((data) => {
              this._snackBar.open('User successfully created!', 'Ok');
              this.userU=new UserModelRequest(data,this.userForm.get('name')!.value!)
            });
        } else{
          this._snackBar.open('Passwords need to match', 'Ok');
        }
      } else {
        this.http.UpdateUser(new UserModelRequest(this.userU?.id,this.userForm.get('name')!.value!)).subscribe((data) => {
            this._snackBar.open('User successfully updated!', 'Ok');
          });
        }

    }

}









