import { Time } from '@angular/common';
import { AssignedObject } from './AssignedObject';

export class Kiosk {
  constructor(
    public id?: string,
    public name?: string, //check selezione testo testo nome
    public ip?: string,
    public store_id?: string,
    public flg_consumations: boolean = true,
    public last_request_date?: Time,
    public categories?: AssignedObject[]
  ) {}
}
