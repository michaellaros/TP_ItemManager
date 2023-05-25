
export class ItemFilterModel {
  constructor(
    public id? :string | null,
    public name? : string | null,
    public barcode? : string | null,
    public pageIndex? : number ,
    public pageSize? : number,
    public language? : string,
  ) {}
}
