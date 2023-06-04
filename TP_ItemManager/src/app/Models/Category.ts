import { AssignedObject } from './AssignedObject';
import { Translation } from './Translation';

export class Category {
  constructor(
    public id?: string,
    public name?: string, //check selezione testo testo nome
    public imagePath?: string,
    public available?: boolean,
    public codConsumationAllowed?: string,
    public categoryOrder?: number,
    public translations?: Translation[],
    public items?: AssignedObject[]

  ) {}
}
