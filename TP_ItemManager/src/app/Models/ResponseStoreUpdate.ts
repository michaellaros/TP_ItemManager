import { StoreModel } from './StoreModel';

export class ResponseStoreUpdate {
  constructor(
    public id?: string,
    public ip?: string,
    public lastUpdateDate?: string
  ) {}
}
