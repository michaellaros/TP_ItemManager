export class Report {
  constructor(
    public name?: string,
    public display?: string,
    public date?: Date | null,
    public isMonthOnly?: boolean,
    public allowTodayReport?: boolean
  ) {}
}
