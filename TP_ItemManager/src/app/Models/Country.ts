import { SearchedObject } from "./SearchedObject";
import { Store } from "./Store";


export class Country {
  forEach: any;
  constructor(
    public id?: string,
    public name?: string,
    public stores?: Store[]
  ) {}
}
