import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ItemFilterModel } from '../Models/ItemFilterModel';
import { CategoryFilterModel } from '../Models/CategoryFilterModel';
import { OptionFilterModel } from '../Models/OptionFilterModel';




@Injectable({
  providedIn: 'root'
})
export class HttpService {
  urlAPI: string;
  assetsUrl: string;
  id!:string;
  name!:string;


  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    @Inject('ASSETS_URL') assetsUrl: string
  ) {
    this.urlAPI = baseUrl + '/';
    this.assetsUrl = assetsUrl;
  }

  FilterItems(filter : ItemFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Items', filter,
      {
        params: new HttpParams()
          .append('id',this.id )
          .append('name', this.name),
      }

      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  FilterCategory(filter : CategoryFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Categories', filter

     )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  FilterOption(filter : OptionFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Options', filter

     )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  ErrorHandler(error: HttpErrorResponse) {


    return throwError(() => new Error(error.message || 'Server error!'));
  }
}
