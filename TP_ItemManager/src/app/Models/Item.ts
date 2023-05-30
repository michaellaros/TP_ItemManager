export class Item {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public barcode?: string,
    public price?: number,
    public imagePath?: string,
    public flg_addToCart?: boolean,
    public flg_verifyAdult?: boolean,
    public flg_isMenu?: boolean,
    public available?: boolean
  ) {}
}
