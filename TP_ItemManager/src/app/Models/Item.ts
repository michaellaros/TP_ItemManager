
export class Item {
  constructor(
    public avaible?: boolean,
    public barcode?: number,
    public description?: string,
    public flg_addToCart?:boolean,
    public flg_verifyAdult?: boolean,
    public flg_isMenu?: boolean,
    public id? :number ,
    public name? : string ,
    public price? : number,
    public imagePath? : string
  ) {}
}
