import { CountryStoreObject } from './CountryStoreObject';
import { SearchedObject } from './SearchedObject';

export class Store {
  constructor(
    public id?: string,
    public name?: string,
    public country_id?: string,
    public kiosks?: any,
    public formattedKiosk?: SearchedObject[]
  ) {}
}
