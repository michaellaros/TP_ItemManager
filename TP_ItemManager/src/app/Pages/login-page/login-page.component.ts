import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Models/UserModel';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public user:UserModel = new UserModel('user','pass')
  loginForm = new FormGroup({
    Username: new FormControl('',[Validators.required]),
    Password: new FormControl('',[Validators.required])

  });
  constructor(private http:HttpService,private status:StatusService,private router: Router){

   }
   public Submit() {
    this.user.username = this.loginForm.get('Username')!.value!
    this.user.password = this.loginForm.get('Password')!.value!
    this.DoLogin();


  }
  DoLogin()
  {
    this.http.Login(this.user).subscribe((data)=>{
      this.status.isLogged = data
      if(this.status.isLogged){
        this.router.navigate(['/Kiosk']);
    console.log(this.user);

      }
      else "error"
    })
  }

}
