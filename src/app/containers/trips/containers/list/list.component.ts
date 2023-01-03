import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/shared/interfaces/state.interface';
import { trip } from 'src/app/shared/interfaces/trip.interface';
import { TripsState } from 'src/app/shared/interfaces/tripsState.interface';
import { selectAllTrips } from '../../store/selector/trip.selectors';

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
