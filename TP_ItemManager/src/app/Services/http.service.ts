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
import { Token } from '../Models/Token';
import { ItemVat } from '../Models/ItemVat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginPageComponent } from '../Pages/login-page/login-page.component';
import { ForceReplicationModel } from '../Models/ForceReplicationModel';
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
    @Inject('ASSETS_URL') assetsUrl: string,
    private snack:MatSnackBar
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

  }
  FilterCategory(filter: CategoryFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Categories', filter)

  }
  FilterOption(filter: OptionFilterModel) {
    return this.http
      .post<any>(this.urlAPI + 'Options', filter)

  }
  FilterKiosk(filter: any) {
    return this.http
      .post<any>(this.urlAPI + 'Kiosks', filter)

  }

  GetItem(id: string) {
    return this.http
      .get<Item>(this.urlAPI + 'Item', {
        params: new HttpParams().append('id', id),
      })

  }

  GetCategory(id: string) {
    return this.http
      .get<Category>(this.urlAPI + 'Category', {
        params: new HttpParams().append('id', id),
      })

  }

  GetOption(id: string) {
    return this.http
      .get<Option>(this.urlAPI + 'Option', {
        params: new HttpParams().append('id', id),
      })

  }

  GetKiosk(id: string) {
    return this.http
      .get<Kiosk>(this.urlAPI + 'Kiosk', {
        params: new HttpParams().append('id', id),
      })
      //
  }

  InsertCategory(category: Category) {
    console.log(category);
    return this.http
      .post<Category>(this.urlAPI + 'InsertCategory', category)

  }

  UpdateCategory(category: Category) {
    console.log(category);
    return this.http
      .post<Category>(this.urlAPI + 'UpdateCategory', category)

  }

  InsertItem(item: Item) {
    console.log(item);
    return this.http
      .post<Category>(this.urlAPI + 'InsertItem', item)

  }

  UpdateItem(item: Item) {
    console.log(item);
    return this.http
      .post<Category>(this.urlAPI + 'UpdateItem', item)

  }

  InsertOption(option: Option) {
    console.log(option);
    return this.http
      .post<Category>(this.urlAPI + 'InsertOption', option)

  }

  UpdateOption(option: Option) {
    console.log(option);
    return this.http
      .post<Category>(this.urlAPI + 'UpdateOption', option)

  }




  InsertItemTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(this.urlAPI + 'InsertItemTranslation', translation, {
        params: new HttpParams().append('id', id),
      })

  }

  UpdateItemTranslation(id: string, translation: Translation) {
    console.log(id);
    return this.http
      .post<Translation[]>(this.urlAPI + 'UpdateItemTranslation', translation, {
        params: new HttpParams().append('id', id),
      })

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

  }

  InsertAssignedObject(data: any, methodName: string) {
    console.log(data);
    return this.http
      .post<AssignedObject[]>(this.urlAPI + methodName, data)

  }
  UpdateAssignedObject(data: any, methodName: string) {
    console.log(data);
    return this.http
      .post<AssignedObject[]>(this.urlAPI + methodName, data)

  }

  DeleteAssignedObject(data: any, methodName: string) {
    console.log(data);
    return this.http
      .post<AssignedObject[]>(this.urlAPI + methodName, data)

  }

  DeleteObject(type: string, id: string) {
    return this.http
      .post<AssignedObject[]>(this.urlAPI + 'Delete' + type, null, {
        params: new HttpParams().append('id', id),
      })

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

  }

  DeleteTimespan(timespan_id: string, category_id: string) {
    return this.http
      .post<Timespan[]>(this.urlAPI + 'DeleteCategoryTimespan', null, {
        params: new HttpParams()
          .append('timespan_id', timespan_id)
          .append('category_id', category_id),
      })

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

  }

  GetImages(folderName: string) {
    return this.http
      .get<string[]>(this.urlAPI + 'Images', {
        params: new HttpParams().append('folderName', folderName),
      })

  }

  UploadImage(folderName: string, image: File) {
    let formData = new FormData();
    formData.append('image', image);
    return this.http
      .post<string[]>(this.urlAPI + 'Image', formData, {
        params: new HttpParams().append('folderName', folderName),
      })

  }
  DeleteImage(imageName: string) {
    return this.http
      .post<string[]>(this.urlAPI + 'DeleteImage', null, {
        params: new HttpParams().append('imageName', imageName),
      })

  }

  InsertKiosk(kiosk: Kiosk) {
    console.log(kiosk);
    return this.http
      .post<Kiosk>(this.urlAPI + 'InsertKiosk', kiosk)

  }

  UpdateKiosk(kiosk: Kiosk) {
    console.log(kiosk);
    return this.http
      .post<Kiosk>(this.urlAPI + 'UpdateKiosk', kiosk)

  }
  GetLanguages() {
    return this.http
      .get<Language[]>(this.assetsUrl + 'i18n/languages.json')

  }
  Login(name:string, password:string){

    return this.http.post<Token>(this.urlAPI + 'DoLogin', {name,password})

  }
  GetUsers(filter: any){
    return this.http.post<any>(this.urlAPI + 'GetUsers', filter);
    //
  }
  CreateUser(name:string,password:string)
  {
    return this.http.post<string>(this.urlAPI + 'CreateUser', {name,password})
    //
  }
  UpdateUser(user:UserModelRequest){
    return this.http.post<UserModelRequest>(this.urlAPI + 'UpdateUser',{id:user.id?.toString(),name:user.name} )

  }

  GetUser(id:string){
    return this.http.post<UserModelRequest>(this.urlAPI + 'GetUser',{id:id,name:''} )

  }
  UpdatePassword(id:string, password:string,oldPassword:string){
    return this.http.post<any>(this.urlAPI + 'UpdatePassword',{id:id,password:password,oldPassword:oldPassword})

  }

  GetItemVat(id:string)
  {
    return this.http.post<ItemVat>(this.urlAPI + 'GetItemVat', null,{
      params: new HttpParams().append('id', id)
    })

  }
  ForceReplication(kiosk:ForceReplicationModel)
  {
    return this.http.post<string>(this.urlAPI + 'KioskReplication', kiosk
    )
  }
  UploadCSV( CSV: File) {
    let formData = new FormData();
    formData.append('CSV', CSV);
    return this.http
      .post<string[]>(this.urlAPI + 'UpdateCSV', formData)

  }
}
