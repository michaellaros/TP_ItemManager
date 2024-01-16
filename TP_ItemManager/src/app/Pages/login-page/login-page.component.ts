import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModelCreate } from 'src/app/Models/UserModelCreate';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';
import { Token } from 'src/app/Models/Token';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public token!: string;
  public user: UserModelCreate = new UserModelCreate('pass', 'pass');
  loginForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });
  constructor(
    private http: HttpService,
    public status: StatusService,
    private router: Router,
    private storage: StorageManagerService
  ) {}
  public Submit() {
    this.user.name = this.loginForm.get('Name')!.value!;
    this.user.password = this.loginForm.get('Password')!.value!;
    this.user.role = 'default';
    this.DoLogin();
  }

  DoLogin() {
    this.http.Login(this.user.name!, this.user.password!).subscribe((data) => {
      // this.status.isLogged = 'true'
      // if(this.status.isLogged == 'true'){
      this.storage.saveRole(data.role);
      this.storage.saveToken(data.token);
      this.storage.saveId(data.id);
      this.router.navigate(['/Kiosk']);
    });
    this.http.GetRole(this.user.name!.toString()).subscribe((data) => {
      console.log(this.storage.var1);
    });
  }

  ngOnInit(): void {
    this.status.error = false;
  }
}
