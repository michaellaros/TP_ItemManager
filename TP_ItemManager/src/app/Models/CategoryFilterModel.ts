
export class CategoryFilterModel {
  constructor(
    public Id? :number,
    public name? : string,
    public pageIndex? : number,
    public pageSize? : number,
    public language? : string,
  ) {}
}
