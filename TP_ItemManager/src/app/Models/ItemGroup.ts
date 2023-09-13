import { AssignedObject } from "./AssignedObject";

export class ItemGroup {
  constructor(
    public id?:string,
    public name?: string,
    public description?: string,
    public itemList?: AssignedObject[]  ) {}
}
