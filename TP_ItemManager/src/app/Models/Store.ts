import { AssignedObject } from './AssignedObject';
import { Translation } from './Translation';

export class Store {
  constructor(
    public id?: string,
    public name?: string,
    public lRetailStoreID?: number,
    public Ip_address?: string
  ) {}
}
