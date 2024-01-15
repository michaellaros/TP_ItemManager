export class TreeObject {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string,
    public children?: TreeObject[]
  ) {}
}
