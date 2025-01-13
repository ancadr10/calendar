import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CalendarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calendar_ang';

  meetings = {
    '2025-01-05': ['Drink Coffee', 'Learn Cloud', 'Sleep'],
    '2025-01-06': ['Drink Coffee', 'Learn Angular', 'Sleep'],
  }
}
