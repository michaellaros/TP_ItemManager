import { Translation } from './Translation';

export class Option {
  constructor(
    public id?: number,
    public name?: string,
    public Flg_addToCart?: boolean,
    public defaultQuantity?: number,
    public maxQuantity?: number,
    public minQuantity?: number,
    public available?: boolean,
    public translations?: Translation[]
  ) {}
}
