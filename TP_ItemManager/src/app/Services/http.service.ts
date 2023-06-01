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
import { Item } from '../Models/Item';
import { Category } from '../Models/Category';
import { Option } from '../Models/Option';
import { Translation } from '../Models/Translation';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlAPI: string;
  assetsUrl: string;
  id!: string;
  name!: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    @Inject('ASSETS_URL') assetsUrl: string
  ) {
    this.urlAPI = baseUrl + '/';
    this.assetsUrl = assetsUrl;
  }

  FilterItems(filter: ItemFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Items', filter, {
        params: new HttpParams()
          .append('id', this.id)
          .append('name', this.name),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  FilterCategory(filter: CategoryFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Categories', filter)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  FilterOption(filter: OptionFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Options', filter)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  GetItem(id: string) {
    return this.http
      .get<Item>(this.urlAPI + 'Item', {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  GetCategory(id: string) {
    return this.http
      .get<Category>(this.urlAPI + 'Category', {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  GetOption(id: string) {
    return this.http
      .get<Option>(this.urlAPI + 'Option', {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertCategory(category: Category) {
    console.log(category);
    return this.http
      .post<Category>(this.urlAPI + 'InsertCategory', category)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateCategory(category: Category) {
    console.log(category);
    return this.http
      .post<Category>(this.urlAPI + 'UpdateCategory', category)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertItem(item: Item) {
    console.log(item);
    return this.http
      .post<Category>(this.urlAPI + 'InsertItem', item)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateItem(item: Item) {
    console.log(item);
    return this.http
      .post<Category>(this.urlAPI + 'UpdateItem', item)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertOption(option: Option) {
    console.log(option);
    return this.http
      .post<Category>(this.urlAPI + 'InsertOption', option)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateOption(option: Option) {
    console.log(option);
    return this.http
      .post<Category>(this.urlAPI + 'UpdateOption', option)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  ErrorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Server error!'));
  }

  InsertItemTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(this.urlAPI + 'InsertItemTranslation', translation, {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateItemTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(this.urlAPI + 'UpdateItemTranslation', translation, {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertCategoryTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(this.urlAPI + 'InsertCategoryTranslation', translation, {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateCategoryTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(this.urlAPI + 'UpdateCategoryTranslation', translation, {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertOptionTranslation(id: string, translation: Translation) {
    console.log(translation);
    return this.http
      .post<Translation[]>(this.urlAPI + 'InsertOptionTranslation', translation, {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateOptionTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(this.urlAPI + 'UpdateOptionTranslation', translation, {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
}
