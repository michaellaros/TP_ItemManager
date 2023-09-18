import { DiscountedItemType } from './Enums/DiscountedItemType';

export class DiscountedObject {
  constructor(
    public id?: string,
    public name?: string,
    public type?: DiscountedItemType
  ) {}
}
