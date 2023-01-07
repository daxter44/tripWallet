import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TripsState } from 'src/app/shared/interfaces/storeStates/tripsState.interface';
import { selectAllTrips } from 'src/app/shared/store/trips/trip.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent{
  public trips$ = this.store.select(selectAllTrips);
  constructor(private store: Store<TripsState>, 
    private navController: NavController) { }

  public addTrip() {
    this.navController.navigateForward(`/application/trips/create`);  
  }
}
