import { AssignedObject } from './AssignedObject';
import { Translation } from './Translation';

export class Option {
  constructor(
    public id?: string,
    public name?: string,
    public flg_addToCart?: boolean,
    public defaultQuantity?: number,
    public maxQuantity?: number,
    public minQuantity?: number,
    public available?: boolean,
    public items?: AssignedObject[],
    public itemsItsIn?: AssignedObject[],
    public translations?: Translation[]
  ) {}
}
