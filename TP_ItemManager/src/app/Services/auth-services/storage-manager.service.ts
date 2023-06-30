import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  constructor() { }

  // ---- token
  public getToken(){
    return localStorage.getItem('TP_ItemManager_AccessToken')!;
  }

  public saveToken(token: string){
    localStorage.setItem('TP_ItemManager_AccessToken', token);
  }

  public removeToken(token: string){
    localStorage.removeItem(token);
  }

  // // ---- username
  // public getUsername(){
  //   return localStorage.getItem('ICashWebApplicationUsername')!;
  // }

  // public saveUsername(username: string){
  //   localStorage.setItem('ICashWebApplicationUsername', username);
  // }

  // public removeUsername(username: string){
  //   localStorage.removeItem(username);
  // }

  // // ---- role
  // public getRole(){
  //   return localStorage.getItem('ICashWebApplicationRole')!;
  // }

  // public saveRole(role: string){
  //   localStorage.setItem('ICashWebApplicationRole', role);
  // }

  // public removeRole(role: string){
  //   localStorage.removeItem(role);
  // }

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

  public isLogged(){
    if(this.getToken()){
      return true;
    }
    return false;
  }

}
