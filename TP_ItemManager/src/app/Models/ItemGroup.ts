import { Item } from "./Item";

export class ItemGroup {
  constructor(
    public id?:string,
    public name?: string,
    public description?: string,
    public itemList?: Item[]  ) {}
}
