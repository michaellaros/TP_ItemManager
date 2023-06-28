import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageManagerService } from './storage-manager.service';
import { Router } from '@angular/router';
import { UserModelCreate } from 'src/app/Models/UserModelCreate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;

  constructor(
    private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private storageManager: StorageManagerService,
    private router: Router
  ) {
    this.baseUrl = baseUrl;
  }

  // public login(user: UserModelCreate): Observable<any> {
  //   return this.http.post<UserModelCreate>(
  //     this.baseUrl +
  //     `/ICashDataAccessAPI/User/login`,
  //     user
  //   );
  // }

  // public GenerateNewTokenOnStoreChanged(store: number): Observable<any> {
  //   return this.http.post<UserModelCreate>(
  //     this.baseUrl +
  //     `/ICashDataAccessAPI/User/GenerateNewTokenOnStoreChanged`,
  //     store
  //   );
  // }

  public logout() {
    // localStorage.removeItem('TPItemManagerLanguage');

    this.storageManager.removeToken('TPItemManagerAccessToken');
    this.storageManager.removeUsername('TPItemManagerUsername');
    // this.storageManager.removeRole('TPItemManagerRole');
    // this.storageManager.removeStore('TPItemManagerStore');
    this.storageManager.removeLoadSetting('TPItemManagerLoadSetting');

    this.router.navigateByUrl('/login-user');
  }
}
