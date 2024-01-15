import { StoreModel } from './StoreModel';

export class ResponseStoreUpdate {
  constructor(
    public id?: string,
    public ip?: string,
    public storeName?: string,
    public szRetailStoreId?: string
  ) {}
}
