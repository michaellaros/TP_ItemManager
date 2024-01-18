import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageManagerService {
  public var1!: number; //role
  public userPermission: number = 1;
  public CountryManagerPermission: number = 101;
  public adminPermission: number = 201;

  constructor() {}
  // ---- id
  public getId() {
    return localStorage.getItem('TP_ItemManager_id')!;
  }

  public saveId(id: string) {
    localStorage.setItem('TP_ItemManager_id', id);
  }

  public removeId(id: string) {
    localStorage.removeItem(id);
  }
  // ---- token
  public getToken() {
    return localStorage.getItem('TP_ItemManager_AccessToken')!;
  }

  public saveToken(token: string) {
    localStorage.setItem('TP_ItemManager_AccessToken', token);
  }

  public removeToken(token: string) {
    localStorage.removeItem(token);
  }

  public CheckPermission(value: number): boolean {
    if (parseInt(this.getRole()) > value) {
      return true;
    }
    return false;
  }
  // ---- username
  public getUsername() {
    return localStorage.getItem('TP_ItemManager_Username')!;
  }

  public saveUsername(username: string) {
    localStorage.setItem('TP_ItemManager_Username', username);
  }

  public removeUsername(username: string) {
    localStorage.removeItem(username);
  }

  // ---- role
  public getRole() {
    return localStorage.getItem('TP_ItemManager_role')!;
  }

  public saveRole(role: string) {
    localStorage.setItem('TP_ItemManager_role', role);
  }

  public removeRole(role: string) {
    localStorage.removeItem(role);
  }

  // // ---- store
  // public getStore(){
  //   return localStorage.getItem('ICashWebApplicationStore')!;
  // }

  // public saveStore(store: string){
  //   localStorage.setItem('ICashWebApplicationStore', store);
  // }

  // public removeStore(store: string){
  //   localStorage.removeItem(store);
  // }

  // // ---- loadSetting
  // public getLoadSetting(){
  //   return localStorage.getItem('ICashWebApplicationLoadSetting')!;
  // }

  // public saveLoadSetting(loadSetting: string){
  //   localStorage.setItem('ICashWebApplicationLoadSetting', loadSetting);
  // }

  // public removeLoadSetting(loadSetting: string){
  //   localStorage.removeItem(loadSetting);
  // }

  public isLogged() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
