import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TripsState } from 'src/app/shared/interfaces/storeStates/tripsState.interface';
import { selectActualTrip } from 'src/app/shared/store/trips/trip.selectors';

@Component({
  selector: 'app-trip-overview',
  templateUrl: './trip-overview.page.html',
  styleUrls: ['./trip-overview.page.scss'],
})
export class TripOverviewPage {
  public trip$ = this.store.select(selectActualTrip);

  constructor(private store: Store<TripsState>) { }

  public countDays(startDate: Date, endDate: Date): number {
    const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return Math.ceil(days);
  }

  
}
