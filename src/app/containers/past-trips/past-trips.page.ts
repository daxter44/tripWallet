import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TripsState } from 'src/app/shared/interfaces/storeStates/tripsState.interface';
import { StorageService } from 'src/app/shared/services/storage.service';
import { selectPastTrips } from 'src/app/shared/store/trips/trip.selectors';

@Component({
  selector: 'app-past-trips',
  templateUrl: './past-trips.page.html',
  styleUrls: ['./past-trips.page.scss'],
})
export class PastTripsPage {
  
  public trips$ = this.store.select(selectPastTrips);
  constructor(private store: Store<TripsState>, 
    private storageService: StorageService) {

    }

}
