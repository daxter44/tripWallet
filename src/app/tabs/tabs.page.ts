import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TripsState } from '../shared/interfaces/storeStates/tripsState.interface';
import { StorageService } from '../shared/services/storage.service';
import * as currencyActions from '../shared/store/currencies/currency.actions';
import * as tripsActions from '../shared/store/trips/trip.actions';
import * as costsActions from '../shared/store/costs/cost.actions';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private navController: NavController,
    private store: Store<TripsState>
  ) {
    this.store.dispatch(currencyActions.loadCurrencyState());
    this.store.dispatch(tripsActions.loadTripState());
    this.store.dispatch(costsActions.loadCostState());
  }

  public onTabClick(event: { tab: any }): void {
    this.navController.navigateRoot(`/application/${event.tab}`);
  }
}
