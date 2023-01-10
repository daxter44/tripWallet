import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TripsState } from 'src/app/shared/interfaces/storeStates/tripsState.interface';
import { trip } from 'src/app/shared/interfaces/trip.interface';
import { StorageService } from 'src/app/shared/services/storage.service';
import { selectAllTrips } from 'src/app/shared/store/trips/trip.selectors';
import * as tripsActions from "../../../../shared/store/trips/trip.actions";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent{
  public trips$ = this.store.select(selectAllTrips);
  constructor(private store: Store<TripsState>, 
    private navController: NavController,
    private storageService: StorageService) {
      // this.storageService.getP('trips').then((results:trip[]) => {
      //   results.forEach((trip) => {
      //     this.store.dispatch(tripsActions.addTrip({ trip: trip }));
      //   });
      //   console.log('load',results);
      //   this.store.dispatch({type: '[Trips] Load Trip State Success', payload: results});
      // });
      this.store.dispatch(tripsActions.loadTripState());
    }

  public addTrip() {
    this.navController.navigateForward(`/application/trips/create`);  
  }
  
}
