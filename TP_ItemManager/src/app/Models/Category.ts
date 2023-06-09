import { AssignedObject } from './AssignedObject';
import { Timespan } from './Timespan';
import { Translation } from './Translation';

export class Category {
  constructor(
    public id?: string,
    public name?: string, //check selezione testo testo nome
    public imagePath?: string,
    public available: boolean = true,
    public codConsumationAllowed: string = 'DI-TA',
    public categoryOrder?: number,
    public translations?: Translation[],
    public items?: AssignedObject[],
    public timespans?: Timespan[]
  ) {}
}
