import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TripsState } from 'src/app/shared/interfaces/storeStates/tripsState.interface';
import { trip } from 'src/app/shared/interfaces/trip.interface';
import { StorageService } from 'src/app/shared/services/storage.service';
import * as currencyActions from '../../../../shared/store/currencies/currency.actions';
import {
  selectAllTrips,
  selectFeaturedTrips,
} from 'src/app/shared/store/trips/trip.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public trips$ = this.store.select(selectFeaturedTrips);
  constructor(
    private store: Store<TripsState>,
    private navController: NavController,
    private storageService: StorageService
  ) {}

  public addTrip() {
    this.navController.navigateForward(`/application/trips/create`);
  }

  public downloadSymbols() {
    this.store.dispatch(currencyActions.loadCurrencyState());
  }
}
