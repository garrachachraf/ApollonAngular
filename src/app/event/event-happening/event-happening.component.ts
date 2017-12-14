import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-happening',
  templateUrl: './event-happening.component.html',
  styleUrls: ['./event-happening.component.css']
})
export class EventHappeningComponent implements OnInit {
  @Input() evento: Event;
  constructor() { }

  ngOnInit() {
  }

}
