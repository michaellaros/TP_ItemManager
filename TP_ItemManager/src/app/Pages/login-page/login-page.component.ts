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
  public user:UserModel = new UserModel('','pass','pass')
  loginForm = new FormGroup({
    Name: new FormControl('',[Validators.required]),
    Password: new FormControl('',[Validators.required])

  });
  error: Boolean = false
  constructor(private http:HttpService,private status:StatusService,private router: Router){

   }
   public Submit() {
    this.user.name = this.loginForm.get('Name')!.value!
    this.user.password = this.loginForm.get('Password')!.value!
    this.DoLogin();


  }
  DoLogin()
  {

    this.http.Login(this.user.name!,this.user.password!).subscribe((data)=>{
      this.status.isLogged = data
      if(this.status.isLogged){
        this.router.navigate(['/Kiosk']);
    console.log(this.user);
    this.error=false


    }
      else
      {
        this.error=true
      }


    })}

}
