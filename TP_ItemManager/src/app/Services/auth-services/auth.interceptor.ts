import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/environment';
import { StorageManagerService } from './storage-manager.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageManager: StorageManagerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.storageManager.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageManager.getToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
