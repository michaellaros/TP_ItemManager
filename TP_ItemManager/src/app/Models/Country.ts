import { CountryStoreObject } from './CountryStoreObject';
import { SearchedObject } from './SearchedObject';
import { Store } from './Store';

export class Country {
  constructor(
    public id?: string,
    public name?: string,
    public stores?: Store[],
    public relationship?: CountryStoreObject[]
  ) {}
}
