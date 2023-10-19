import { SearchedObject } from './SearchedObject';

export class StoreDetail {
  constructor(
    public id?: string,
    public name?: string,
    public store_ip?: string,
    public lRetailStoreID?: string,
    public last_request_date?: string,
    public country_name?:string,
    public country_id?:string
  ) {}
}
