import { AssignedObject } from './AssignedObject';

export class Discount {
  constructor(
    public id?: string,
    public name?: string,
    public items?: AssignedObject[],
    public stores?: AssignedObject[]
  ) {}
}
