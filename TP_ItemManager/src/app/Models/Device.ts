import { AssignedObject } from './AssignedObject';
import { Translation } from './Translation';

export class Device {
  constructor(
    public id?: string,
    public name?: string,
    public macAddress?: string,
    public szWorkstationID?: string,
    public store_id?: number,
    public Active_menu_id?: number
  ) {}
}
