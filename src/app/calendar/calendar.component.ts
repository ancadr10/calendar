import { CommonModule } from '@angular/common';
import { Component, computed, input, InputSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';

import { Meetings } from './models/meetings.interface';

import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  meetings: InputSignal<Meetings> = input.required();

  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));

  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week')
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong dates');
        }
        return d.start;
      })
  });

  activeDay: WritableSignal<DateTime | null> = signal(null);
  activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDay = this.activeDay();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay?.toISODate();
    if (!activeDayISO) {
      return [];
    }
    return this.meetings()[activeDayISO] ?? [];
  });

  DATE_MED = DateTime.DATETIME_MED;

  ngOnInit() {
    console.log('today=', this.today().toString());
    console.log('first_day_of_current_month=', this.today().startOf('month').toString());
  }

  goToPreviousMonth() {
    this.firstDayOfActiveMonth.set(this.firstDayOfActiveMonth().minus({ month: 1 }));
  }

  goToNextMonth() {
    this.firstDayOfActiveMonth.set(this.firstDayOfActiveMonth().plus({ month: 1 }));
  }

  goToToday() {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }
}
