
export class CategoryFilterModel {
  constructor(
    public id? :string ,
    public name? : string ,
    public pageIndex? : number,
    public pageSize? : number,
    public language? : string,
  ) {}
}
