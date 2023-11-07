import { UserRelationshipType } from "./Enums/UserRelationshipType";



export class CountryStoreObject {
  constructor(
    public id?: string,
    public name?: string,
    public type?: UserRelationshipType
  ) {}
}
