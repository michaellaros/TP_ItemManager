import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/environment';
import { StorageManagerService } from './storage-manager.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { StatusService } from '../status.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private status:StatusService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err)
        if (err.status === 401) {
          this.authService.logout();
          this.status.error=true
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
