import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TripsState } from '../../interfaces/storeStates/tripsState.interface';
import { trip } from '../../interfaces/trip.interface';
import * as TripActions from "../../store/trips/trip.actions";

@Component({
  selector: 'app-trip-tile',
  templateUrl: './trip-tile.component.html',
  styleUrls: ['./trip-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripTileComponent implements OnInit {
  @Input() public trip: trip = {} as trip;
  public date = new Date();

  constructor(
    private navController: NavController,
    private store: Store<TripsState>) { }

  @HostListener('click')
  public onTileClick() {
    this.openTripDetails();
  }

  public openTripDetails(): void {
    this.navController.navigateForward(`/application/trips/${this.trip.tripId}/details`);
  }

  public removeTrip() {
    this.store.dispatch(TripActions.removeTrip({ tripId: this.trip.tripId }));
  }

  ngOnInit() {}

}
