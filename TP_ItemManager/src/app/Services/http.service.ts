import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ItemFilterModel } from '../Models/ItemFilterModel';
import { CategoryFilterModel } from '../Models/CategoryFilterModel';
import { OptionFilterModel } from '../Models/OptionFilterModel';
import { Item } from '../Models/Item';
import { Category } from '../Models/Category';
import { Option } from '../Models/Option';
import { Translation } from '../Models/Translation';
import { AssignedObject } from '../Models/AssignedObject';
import { Timespan } from '../Models/Timespan';
import { Kiosk } from '../Models/Kiosk';
import { Language } from '../Models/language';
import { SearchedObject } from '../Models/SearchedObject';
import { UserModelRequest } from '../Models/UserModelRequest';

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
  FilterKiosk(filter: any) {
    return this.http
      .post<any>(this.urlAPI + 'Kiosks', filter)
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

  GetKiosk(id: string) {
    return this.http
      .get<Kiosk>(this.urlAPI + 'Kiosk', {
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
      .post<Translation[]>(
        this.urlAPI + 'InsertCategoryTranslation',
        translation,
        {
          params: new HttpParams().append('id', id),
        }
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateCategoryTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(
        this.urlAPI + 'UpdateCategoryTranslation',
        translation,
        {
          params: new HttpParams().append('id', id),
        }
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertOptionTranslation(id: string, translation: Translation) {
    console.log(translation);
    return this.http
      .post<Translation[]>(
        this.urlAPI + 'InsertOptionTranslation',
        translation,
        {
          params: new HttpParams().append('id', id),
        }
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateOptionTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(
        this.urlAPI + 'UpdateOptionTranslation',
        translation,
        {
          params: new HttpParams().append('id', id),
        }
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertAssignedObject(data: any, methodName: string) {
    console.log(data);
    return this.http
      .post<AssignedObject[]>(this.urlAPI + methodName, data)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  UpdateAssignedObject(data: any, methodName: string) {
    console.log(data);
    return this.http
      .post<AssignedObject[]>(this.urlAPI + methodName, data)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  DeleteAssignedObject(data: any, methodName: string) {
    console.log(data);
    return this.http
      .post<AssignedObject[]>(this.urlAPI + methodName, data)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  DeleteObject(type: string, id: string) {
    return this.http
      .post<AssignedObject[]>(this.urlAPI + 'Delete' + type, null, {
        params: new HttpParams().append('id', id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateTimespan(
    timespan_id: string,
    AvailableFrom: number,
    AvailableTo: number,
    idCategory: string
  ) {
    return this.http
      .post<Timespan[]>(
        this.urlAPI + 'UpdateCategoryTimespan',
        {
          id: timespan_id,
          AvailableFrom: AvailableFrom,
          AvailableTo: AvailableTo,
        },
        {
          params: new HttpParams().append('id', idCategory),
        }
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertTimespan(
    AvailableFrom: number,
    AvailableTo: number,
    idCategory: string
  ) {
    return this.http
      .post<Timespan[]>(
        this.urlAPI + 'InsertCategoryTimespan',
        { AvailableFrom: AvailableFrom, AvailableTo: AvailableTo },
        {
          params: new HttpParams().append('id', idCategory),
        }
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  DeleteTimespan(timespan_id: string, category_id: string) {
    return this.http
      .post<Timespan[]>(this.urlAPI + 'DeleteCategoryTimespan', null, {
        params: new HttpParams()
          .append('timespan_id', timespan_id)
          .append('category_id', category_id),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  DeleteTranslation(translation: Translation, id: string, type: string) {
    return this.http
      .post<Translation[]>(
        this.urlAPI + 'Delete' + type + 'Translation',
        translation,
        {
          params: new HttpParams().append('id', id),
        }
      )
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  GetImages(folderName: string) {
    return this.http
      .get<string[]>(this.urlAPI + 'Images', {
        params: new HttpParams().append('folderName', folderName),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UploadImage(folderName: string, image: File) {
    let formData = new FormData();
    formData.append('image', image);
    return this.http
      .post<string[]>(this.urlAPI + 'Image', formData, {
        params: new HttpParams().append('folderName', folderName),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  DeleteImage(imageName: string) {
    return this.http
      .post<string[]>(this.urlAPI + 'DeleteImage', null, {
        params: new HttpParams().append('imageName', imageName),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  InsertKiosk(kiosk: Kiosk) {
    console.log(kiosk);
    return this.http
      .post<Kiosk>(this.urlAPI + 'InsertKiosk', kiosk)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  UpdateKiosk(kiosk: Kiosk) {
    console.log(kiosk);
    return this.http
      .post<Kiosk>(this.urlAPI + 'UpdateKiosk', kiosk)
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  GetLanguages() {
    return this.http
      .get<Language[]>(this.assetsUrl + 'i18n/languages.json')
      .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  Login(name:string, password:string){

    return this.http.post<string>(this.urlAPI + 'DoLogin', {name,password})
    .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  GetUsers(filter: any){
    return this.http.post<any>(this.urlAPI + 'GetUsers', filter)
    .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  CreateUser(name:string,password:string)
  {
    return this.http.post<string>(this.urlAPI + 'CreateUser', {name,password})
    .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  UpdateUser(user:UserModelRequest){
    return this.http.post<UserModelRequest>(this.urlAPI + 'UpdateUser',{id:user.id?.toString(),name:user.name} )
    .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }

  GetUser(id:string){
    return this.http.post<UserModelRequest>(this.urlAPI + 'GetUser',{id:id,name:''} )
    .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }
  UpdatePassword(id:string, password:string,oldPassword:string){
    return this.http.post<any>(this.urlAPI + 'UpdatePassword',{id:id,password:password,oldPassword:oldPassword})
    .pipe(catchError((error: HttpErrorResponse) => this.ErrorHandler(error)));
  }


}
