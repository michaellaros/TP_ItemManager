import { AssignedObject } from './AssignedObject';
import { DiscountedObject } from './DiscountedObject';

export class Discount {
  constructor(
    public id?: string,
    public name?: string,
    public items?: DiscountedObject[],
    public stores?: AssignedObject[]
  ) {}
}
