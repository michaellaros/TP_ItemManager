
export class OptionFilterModel {
  constructor(
    public id? :string | null,
    public name? : string | null,
    public pageIndex? : number,
    public pageSize? : number,
    public language? : string,
  ) {}
}
