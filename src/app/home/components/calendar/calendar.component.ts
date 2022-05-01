import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  modes=['date', 'month-year','time-date', 'year'];
  selectedMode = 'date';

  constructor() { }

  ngOnInit() {}

}
