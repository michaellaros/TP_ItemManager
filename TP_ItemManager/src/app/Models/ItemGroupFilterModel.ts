export class ItemGroupFilterModel {
  constructor(
    public id?: string,
    public name?: string,
    public barcode?: string,
    public pageIndex?: number,
    public pageSize?: number
  ) {}
}
