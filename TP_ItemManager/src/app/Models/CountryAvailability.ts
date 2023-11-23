import { StoreAvailability } from './StoreAvailability';

export class CountryAvailability {
  constructor(
    public id?: string,
    public name?: string,
    public available?: boolean,
    public stores?: StoreAvailability[]
  ) {}
}
