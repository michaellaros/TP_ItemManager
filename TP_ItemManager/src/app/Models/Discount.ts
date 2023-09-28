import { AssignedObject } from './AssignedObject';
import { DiscountedObject } from './DiscountedObject';

export class Discount {
  constructor(
    public id?: string,
    public name?: string,
    public discountType?:string,
    public discountValue?:string,
    public items?: DiscountedObject[],
    public stores?: AssignedObject[]
  ) {}
}
