import { AssignedObject } from './AssignedObject';
import { DiscountedObject } from './DiscountedObject';

export class Discount {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string,
    public value?: number,
    public description?: string,
    public quantity?: number,
    public country_id?: string,
    public flg_distribute?: boolean, //distribute discount on all items discounted
    public flg_discountedItems?: boolean,
    public flg_loyalty?: boolean,
    public items?: DiscountedObject[],
    public stores?: AssignedObject[]
  ) {}
}
