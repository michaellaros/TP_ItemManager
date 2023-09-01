import { SearchedObject } from './SearchedObject';

export class Store {
  constructor(
    public id?: string,
    public name?: string,
    public kiosks?: any,
    public formattedKiosk?: SearchedObject[]
  ) {}
}
