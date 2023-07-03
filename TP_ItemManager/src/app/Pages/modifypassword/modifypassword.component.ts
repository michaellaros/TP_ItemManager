import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UserModelRequest } from 'src/app/Models/UserModelRequest';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modifypassword',
  templateUrl: './modifypassword.component.html',
  styleUrls: ['./modifypassword.component.scss']
})
export class ModifypasswordComponent {
  passForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required]),
    confPass:new FormControl('', [Validators.required])
  });
  public user!:string;
  constructor(private router:Router,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
  }
  ngOnInit():void{
    this.user = this.status.user;
    console.log(this.user);
    this.status.isLogged='false';
  }
  ErrorSnack(){
    this._snackBar.open('Old password is not correct', 'Ok');

  }
  SubmitForm()
  {
    if(this.passForm.get('oldPass')?.value != this.passForm.get('newPass')?.value && this.passForm.get('oldPass')?.value != this.passForm.get('confPass')?.value && this.passForm.get('newPass')?.value === this.passForm.get('confPass')?.value){
      let newpassword = this.passForm.get('confPass')!.value!;
      let oldPass = this.passForm.get('oldPass')!.value!;
      this.http.UpdatePassword(this.user,newpassword,oldPass).subscribe((data)=>{

        this.router.navigate(['/User']);
        this.status.isLogged='true';
      this._snackBar.open('Password successfully Update!', 'Ok',{
        duration:this.status.snackbarDuration
      });
      })


    }
    else{
      this._snackBar.open('Passwords need to match!', 'Ok',{
        duration:this.status.snackbarDuration
      });

    }
  }
  home(){
    this.status.isLogged='true';
    this.router.navigate(['/Kiosk']);
  }
}
