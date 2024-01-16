import { CountryStoreObject } from './CountryStoreObject';
import { UserRelationshipType } from './Enums/UserRelationshipType';

export class UserModelResult {
  constructor(
    public id?: string,
    public name?: string,
    public role?: string,
    public relationship?: CountryStoreObject[]
  ) {}
}
