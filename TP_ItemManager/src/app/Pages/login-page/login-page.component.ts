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
  public token!: Token;
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
    this.DoLogin();
  }
  DoLogin() {
    this.http.Login(this.user.name!, this.user.password!).subscribe((data) => {
      // this.status.isLogged = 'true'
      // if(this.status.isLogged == 'true'){
      this.token = data;
      console.log(this.token);

      this.storage.saveToken(this.token.token!);
      console.log(this.storage.getToken());
      this.router.navigate(['/Device']);
      console.log(this.user);
    });
  }
  ngOnInit(): void {
    this.status.error = false;
  }
}
