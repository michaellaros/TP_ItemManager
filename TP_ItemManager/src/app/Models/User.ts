export class User {
  constructor(
    public id?: string,
    public name?: string,
    public role?: number,
    public badge?: string,
    public vyUser?: string,
    public lastPasswordUpdate?: Date,
    public password?: string
  ) {}
}
