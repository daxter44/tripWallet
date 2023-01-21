import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TripsState } from '../shared/interfaces/storeStates/tripsState.interface';
import * as currencyActions from "../shared/store/currencies/currency.actions";
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private navController: NavController, private store: Store<TripsState>) {

    }
    
  public onTabClick(event: { tab: any; }): void {
    this.navController.navigateRoot(`/application/${event.tab}`);
  }
}