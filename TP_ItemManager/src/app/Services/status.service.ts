import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StatusService {
  public buttonValue : string = 'category';
  constructor() { }
}
