import { Injectable } from '@angular/core';
import { Language } from '../Models/language';


@Injectable({
  providedIn: 'root'
})
export class StatusService {
  public buttonValue : string = 'category';
  public languages: Language[] = [];
  public isLogged: Boolean = false;
  public user:string = '';
  constructor() { }
}
