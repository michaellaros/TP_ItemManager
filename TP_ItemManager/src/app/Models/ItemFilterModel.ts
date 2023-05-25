
export class ItemFilterModel {
  constructor(
    public Id? :number,
    public name? : string,
    public barcode? : string,
    public pageIndex? : number,
    public pageSize? : number,
    public language? : string,
  ) {}
}
