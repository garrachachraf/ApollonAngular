export class CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  color: string;
  constructor (   title: string,
  start: Date,
  end: Date,
  color: string) {
    this.title = title ;
    this.end = end ;
    this.start = start;
    this.color = color;
  }
}
