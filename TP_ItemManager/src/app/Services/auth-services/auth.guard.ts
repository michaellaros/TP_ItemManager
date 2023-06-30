import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { StorageManagerService } from './storage-manager.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private storageManager: StorageManagerService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if (!this.storageManager.isLogged()) {
      this.router.navigateByUrl('/login-page');
      return false;
    }
    return true;
  }

  public canLoad(): boolean {
    if (!this.storageManager.isLogged()) {
      this.router.navigateByUrl('/login-page');
      return false;
    }
    return true;
  }

}
