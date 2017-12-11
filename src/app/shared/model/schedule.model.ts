export class Schedule {
  id: number;
  title: string
  startDate: Date;
  endDate: Date;
  type: string;
  constructor( title: string, startDate: Date, endDate: Date,  type: string) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
  }
}
