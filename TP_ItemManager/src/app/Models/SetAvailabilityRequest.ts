import { StoreAvailability } from './StoreAvailability';

export class SetAvailabilityRequest {
  constructor(
    public id?: string,
    public type?: string,
    public availabilities?: string[]
  ) {}
}
