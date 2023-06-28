import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  constructor() { }

  // ---- token
  public getToken(){
    return localStorage.getItem('TPItemManagerAccessToken')!;
  }

  public saveToken(token: string){
    localStorage.setItem('TPItemManagerAccessToken', token);
  }

  public removeToken(token: string){
    localStorage.removeItem(token);
  }

  // ---- username
  public getUsername(){
    return localStorage.getItem('TPItemManagerUsername')!;
  }

  public saveUsername(username: string){
    localStorage.setItem('TPItemManagerUsername', username);
  }

  public removeUsername(username: string){
    localStorage.removeItem(username);
  }

  // ---- role
  public getRole(){
    return localStorage.getItem('TPItemManagerRole')!;
  }

  public saveRole(role: string){
    localStorage.setItem('TPItemManagerRole', role);
  }

  public removeRole(role: string){
    localStorage.removeItem(role);
  }

  // ---- store
  public getStore(){
    return localStorage.getItem('TPItemManagerStore')!;
  }

  public saveStore(store: string){
    localStorage.setItem('TPItemManagerStore', store);
  }

  public removeStore(store: string){
    localStorage.removeItem(store);
  }

  // ---- loadSetting
  public getLoadSetting(){
    return localStorage.getItem('TPItemManagerLoadSetting')!;
  }

  public saveLoadSetting(loadSetting: string){
    localStorage.setItem('TPItemManagerLoadSetting', loadSetting);
  }

  public removeLoadSetting(loadSetting: string){
    localStorage.removeItem(loadSetting);
  }

  public isLogged(){
    if(this.getToken()){
      return true;
    }
    return false;
  }

}
