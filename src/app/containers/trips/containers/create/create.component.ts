import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { NavController, ViewDidLeave } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { tripCreate } from 'src/app/shared/interfaces/forms/tripCreate.interface';
import { TripsState } from 'src/app/shared/interfaces/storeStates/tripsState.interface';
import { trip } from 'src/app/shared/interfaces/trip.interface';
import { Destroyable } from 'src/app/shared/services/destroyable.component';
import { selectAllTrips } from 'src/app/shared/store/trips/trip.selectors';
import { addTrip } from 'src/app/shared/store/trips/trip.actions';
import * as tripsActions from '../../../../shared/store/trips/trip.actions';
import { selectAllCurrencies } from 'src/app/shared/store/currencies/currency.selectors';
import { currency } from 'src/app/shared/interfaces/currency.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends Destroyable implements ViewDidLeave {
  private newTripId: number = 0;
  public defaultStartDate = new Date();
  public defaultEndDate = new Date(
    this.defaultStartDate.getTime() + 1000 * 60 * 60 * 24
  );
  public dateValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const start = control.get('startDate');
    const end = control.get('endDate');

    return start &&
      start.value !== null &&
      end &&
      end.value !== null &&
      start.value < end.value
      ? null
      : { dateValid: true };
  };
  private clearPage$: Subject<void> = new Subject<void>();
  public viewLeft = false;
  public currencies$: Observable<currency[]> =
    this.store.select(selectAllCurrencies);
  public tripCreateForm: FormGroup<tripCreate> = new FormGroup<tripCreate>(
    {
      tripId: new FormControl<number | undefined>(
        { value: undefined, disabled: false },
        { nonNullable: true }
      ),
      name: new FormControl<string>(
        { value: '', disabled: false },
        { nonNullable: true }
      ),
      budget: new FormControl<number>(
        { value: 0, disabled: false },
        { nonNullable: true }
      ),
      currency: new FormControl<currency | undefined>(
        { value: undefined, disabled: false },
        { nonNullable: true }
      ),
      startDate: new FormControl<string>(
        { value: this.defaultStartDate.toISOString(), disabled: false },
        { nonNullable: true }
      ),
      endDate: new FormControl<string>(
        { value: this.defaultEndDate.toISOString(), disabled: false },
        { nonNullable: true }
      ),
    },
    { validators: this.dateValidator }
  );

  constructor(
    private store: Store<TripsState>,
    private navController: NavController
  ) {
    super();
    this.store
      .select(selectAllTrips)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((trips) => {
        this.newTripId = trips.length;
      });
  }

  public getStartDate() {
    return this.tripCreateForm.get('startDate')?.value;
  }

  public getEndDate() {
    return this.tripCreateForm.get('startDate')?.value;
  }

  public setStartDate(e: any) {
    let date = new Date(e.target.value).toISOString();
    this.tripCreateForm.get('startDate')!.setValue(date, {
      onlyself: true,
    });
  }

  public setEndDate(e: any) {
    let date = new Date(e.target.value).toISOString();
    this.tripCreateForm.get('endDate')!.setValue(date, {
      onlyself: true,
    });
  }

  public submit() {
    const trip: trip = {
      tripId: this.newTripId,
      name: this.tripCreateForm.get('name')?.value || '',
      budget: this.tripCreateForm.get('budget')?.value || 0,
      currency: this.tripCreateForm.get('currency')?.value!,
      startDate: new Date(
        this.tripCreateForm.get('startDate')?.value || this.defaultStartDate
      ),
      endDate: new Date(
        this.tripCreateForm.get('endDate')?.value || this.defaultEndDate
      ),
    };
    this.store.dispatch(tripsActions.addTrip({ trip }));
    this.navController.navigateForward(`/application/trips/list`);
  }
}
