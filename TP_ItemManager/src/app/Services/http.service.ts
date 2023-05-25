import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ItemFilterModel } from '../Models/ItemFilterModel';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  urlAPI: string;
  assetsUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    @Inject('ASSETS_URL') assetsUrl: string
  ) {
    this.urlAPI = baseUrl + '/';
    this.assetsUrl = assetsUrl;
  }

  GetItems(filter : ItemFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Item', {

      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  ErrorHandler(error: HttpErrorResponse): any {
    throw new Error('Method not implemented.');
  }
}
