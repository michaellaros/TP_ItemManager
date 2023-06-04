import { AssignedObject } from './AssignedObject';
import { Translation } from './Translation';

export class Item {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public barcode?: string,
    public price?: number,
    public imagePath?: string,
    public flg_addToCart?: boolean,
    public flg_verifyAdult?: boolean,
    public flg_isMenu?: boolean,
    public available?: boolean,
    public options?: AssignedObject[],
    public categoriesItsIn?: AssignedObject[],
    public optionsItsIn?: AssignedObject[],
    public translations?: Translation[]
  ) {}
}
