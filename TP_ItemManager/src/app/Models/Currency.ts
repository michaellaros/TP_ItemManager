export class Currency {
  constructor(
    public code?: string,
    public symbol?: string,
    public label?: string,
    public conversionRate?: number
  ) {}
}
