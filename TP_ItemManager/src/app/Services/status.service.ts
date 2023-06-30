import { Injectable } from '@angular/core';
import { Language } from '../Models/language';


@Injectable({
  providedIn: 'root'
})
export class StatusService {
  public token!:string;
  public buttonValue : string = 'category';
  public languages: Language[] = [];
  public isLogged: string = 'false';
  public user:string = '';
  constructor() { }
}
