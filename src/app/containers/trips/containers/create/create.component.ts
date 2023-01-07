import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { tripCreate } from 'src/app/shared/interfaces/forms/tripCreate.interface';
import { TripsState } from 'src/app/shared/interfaces/storeStates/tripsState.interface';
import { DatePipe } from "@angular/common";
import { trip } from 'src/app/shared/interfaces/trip.interface';
import { Destroyable } from 'src/app/shared/services/destroyable.component';
import { selectAllTrips } from 'src/app/shared/store/trips/trip.selectors';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends Destroyable {

  public defaultDate =new Date().toISOString();
  tripCreateForm: FormGroup<tripCreate> = new FormGroup<tripCreate>({
    tripId: new FormControl<number|undefined>({value: undefined, disabled: false}, { nonNullable: true }),
    name: new FormControl<string>({value: '', disabled: false}, { nonNullable: true }),
    budget: new FormControl<number|undefined>({value: undefined, disabled: false}, { nonNullable: true }),
    currency: new FormControl<string>({value: '', disabled: false}, { nonNullable: true }),
    startDate: new FormControl<string>({value: this.defaultDate, disabled: false}, { nonNullable: true }),
    endDate: new FormControl<string>({value: this.defaultDate, disabled: false}, { nonNullable: true }),
   });
  private newTripId: number = 0;
  

  constructor(private store: Store<TripsState>, private navController: NavController, private datePipe: DatePipe) { 
    super();
    this.store.select(selectAllTrips).pipe(takeUntil(this.destroyed$)).subscribe(trips => {
      this.newTripId = trips.length+1;
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
  this.store.dispatch({ type: '[Trip Store] Add trip', trip });
  this.navController.navigateForward(`/application/trips/list`);
 }

}
