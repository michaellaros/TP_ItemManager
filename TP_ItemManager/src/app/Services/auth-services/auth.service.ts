import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageManagerService } from './storage-manager.service';
import { Router } from '@angular/router';
import { StatusService } from '../status.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private storageManager: StorageManagerService,
    private router: Router,
    private status: StatusService
  ) {
    this.baseUrl = baseUrl;
  }

  // public login(user: User): Observable<any> {
  //   return this.http.post<User>(
  //     this.baseUrl +
  //     `/ICashDataAccessAPI/User/login`,
  //     user
  //   );
  // }

  // public GenerateNewTokenOnStoreChanged(store: number): Observable<any> {
  //   return this.http.post<User>(
  //     this.baseUrl +
  //     `/ICashDataAccessAPI/User/GenerateNewTokenOnStoreChanged`,
  //     store
  //   );
  // }

  public logout() {
    // localStorage.removeItem('ICashWebApplicationLanguage');
    this.storageManager.var1 = 0;
    this.storageManager.removeToken('TP_ItemManager_AccessToken');
    // this.storageManager.removeUsername('ICashWebApplicationUsername');
    this.storageManager.removeRole('TP_ItemManager_role');
    this.storageManager.removeId('TP_ItemManager_id');
    this.storageManager.removeUsername('TP_ItemManager_Username');
    // this.storageManager.removeStore('ICashWebApplicationStore');
    // this.storageManager.removeLoadSetting('ICashWebApplicationLoadSetting');
    this.router.navigateByUrl('/login-page');
  }
}
