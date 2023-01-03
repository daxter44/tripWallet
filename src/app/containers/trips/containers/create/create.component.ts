import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { TripsState } from 'src/app/shared/interfaces/tripsState.interface';
import { Destroyable } from 'src/app/shared/services/destroyable.component';
import { selectAllTrips } from '../../store/selector/trip.selectors';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends Destroyable {
  tripform = new FormGroup({
    tripId: new FormControl(''),
    name: new FormControl(''),
    budget: new FormControl(''),
    currency: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
   });
  private newTripId: number = 0;
  

  constructor(private store: Store<TripsState>, private navController: NavController) { 
    super();
    this.store.select(selectAllTrips).pipe(takeUntil(this.destroyed$)).subscribe(trips => {
      this.newTripId = trips.length+1;
    });
  }

 public submit() {
  const trip = this.tripform.value;
  trip.tripId = this.newTripId.toString();
  this.store.dispatch({ type: '[Trip Store] Add trip', trip });
  this.navController.navigateForward(`/application/trips/list`);
 }

 private randomIntFromInterval(min: number, max : number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
