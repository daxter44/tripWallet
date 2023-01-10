import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController, ViewDidLeave } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { tripCreate } from 'src/app/shared/interfaces/forms/tripCreate.interface';
import { TripsState } from 'src/app/shared/interfaces/storeStates/tripsState.interface';
import { trip } from 'src/app/shared/interfaces/trip.interface';
import { Destroyable } from 'src/app/shared/services/destroyable.component';
import { selectAllTrips } from 'src/app/shared/store/trips/trip.selectors';
import { addTrip } from 'src/app/shared/store/trips/trip.actions';
import * as tripsActions from "../../../../shared/store/trips/trip.actions";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends Destroyable implements ViewDidLeave {
  private newTripId: number = 0;
  public defaultDate =new Date().toISOString();
  private clearPage$: Subject<void> = new Subject<void>();
  public viewLeft = false;
  public tripCreateForm: FormGroup<tripCreate> = new FormGroup<tripCreate>({
    tripId: new FormControl<number|undefined>({value: undefined, disabled: false}, { nonNullable: true }),
    name: new FormControl<string>({value: '', disabled: false}, { nonNullable: true }),
    budget: new FormControl<number>({value: 0, disabled: false}, { nonNullable: true }),
    currency: new FormControl<string>({value: '', disabled: false}, { nonNullable: true }),
    startDate: new FormControl<string>({value: this.defaultDate, disabled: false}, { nonNullable: true }),
    endDate: new FormControl<string>({value: this.defaultDate, disabled: false}, { nonNullable: true }),
   });
  

  constructor(private store: Store<TripsState>, private navController: NavController) { 
    super();
    this.store.select(selectAllTrips).pipe(takeUntil(this.destroyed$)).subscribe(trips => {
      this.newTripId = trips.length;
    });
  }

  public getStartDate(e: any) {
    let date = new Date(e.target.value).toISOString();
    this.tripCreateForm.get('startDate')!.setValue(date, {
       onlyself: true
    })
  }

  public getEndDate(e: any) {
    let date = new Date(e.target.value).toISOString();
    this.tripCreateForm.get('endDate')!.setValue(date, {
      onlyself: true
    })
  }

 public submit() {
  const trip : trip =  {
    tripId: this.newTripId,
    name: this.tripCreateForm.get('name')?.value||'',
    budget: this.tripCreateForm.get('budget')?.value||0,
    currency: this.tripCreateForm.get('currency')?.value||'',
    startDate: new Date(this.tripCreateForm.get('startDate')?.value||this.defaultDate),
    endDate:  new Date(this.tripCreateForm.get('endDate')?.value||this.defaultDate),
  }
  this.store.dispatch(tripsActions.addTrip({trip}));
  this.navController.navigateForward(`/application/trips/list`);
 }

}
