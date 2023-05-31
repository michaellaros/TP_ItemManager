import { Translation } from './Translation';

export class Category {
  constructor(
    public id?: number,
    public name?: string, //check selezione testo testo nome
    public imagePath?: string,
    public available?: boolean,
    public codConsumationAllowed?: string,
    public categoryOrder?: number,
    public translations?: Translation[]
  ) {}
}
