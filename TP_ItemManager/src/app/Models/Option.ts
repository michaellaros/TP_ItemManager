import { Translations } from "./Translations";

export class Option {
  constructor(
    public defaultQuantity?: number,
    public flg_addToCart?:boolean,
    public id? :number ,
    public maxQuantity? :number ,
    public minQuantity? :number ,
    public name? : string,
    public translations?: Translations[]
  ) {}
}
