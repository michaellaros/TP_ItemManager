import { CountryStoreObject } from './CountryStoreObject';
import { UserRelationshipType } from './Enums/UserRelationshipType';

export class UserModelRequest {
  constructor(
    public id?: string,
    public name?: string,
    public role?: string,
    public relationship?: CountryStoreObject[]
  ) {}
}
