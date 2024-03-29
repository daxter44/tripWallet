import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { costForm } from 'src/app/shared/interfaces/forms/costForm.interface';
import { CostState } from 'src/app/shared/interfaces/storeStates/costState.interface';
import { Destroyable } from 'src/app/shared/services/destroyable.component';
import { selectAllCosts } from 'src/app/shared/store/costs/cost.selectors';
import * as costActions from '../../../../shared/store/costs/cost.actions';
import { cost } from 'src/app/shared/interfaces/cost.interface';
import {
  CostType,
  costTypesInitialState,
} from 'src/app/shared/interfaces/costType.interface';
import { ExchangeRateService } from 'src/app/shared/services/exchangeRate.service';
import { selectTripById } from 'src/app/shared/store/trips/trip.selectors';
import { trip } from 'src/app/shared/interfaces/trip.interface';
import { currency } from 'src/app/shared/interfaces/currency.interface';
import { selectAllCurrencies } from 'src/app/shared/store/currencies/currency.selectors';

@Component({
  selector: 'app-add-cost',
  templateUrl: './add-cost.component.html',
  styleUrls: ['./add-cost.component.scss'],
})
export class AddCostComponent extends Destroyable implements OnInit {
  public exchangeRate: any;

  public defaultDate = new Date().toISOString();
  public costTypes = costTypesInitialState;
  public providedCostType: CostType | undefined;
  private clearPage$: Subject<void> = new Subject<void>();
  costForm: FormGroup<costForm> = new FormGroup<costForm>({
    type: new FormControl<CostType>(
      { value: costTypesInitialState[0], disabled: false },
      { nonNullable: true }
    ),
    amount: new FormControl<number>(
      { value: 0, disabled: false },
      { nonNullable: true, validators: [Validators.required] }
    ),
    currency: new FormControl<currency | undefined>(
      { value: undefined, disabled: false },
      { nonNullable: true, validators: [Validators.required] }
    ),
    date: new FormControl<string>(
      { value: this.defaultDate, disabled: false },
      { nonNullable: true, validators: [Validators.required] }
    ),
  });
  private newCostId: number = 0;
  private tripId: number = 0;
  public trip$: Observable<trip | undefined> = of(undefined);
  public currencies$: Observable<currency[]> =
    this.store.select(selectAllCurrencies);
  public exchangeRateLoading: boolean = false;

  constructor(
    private store: Store<CostState>,
    private activeRoute: ActivatedRoute,
    private navController: NavController,
    private exchangeRateService: ExchangeRateService
  ) {
    super();
    this.store
      .select(selectAllCosts)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((costs) => {
        this.newCostId = costs.length + 1;
      });
  }

  ngOnInit() {
    this.initializeViewData();
    if (this.providedCostType) {
      this.costForm.controls.type?.patchValue(this.providedCostType);
    }
  }

  private initializeViewData(): void {
    this.activeRoute.params
      .pipe(
        map((params) => [params['id'], params['type']]),
        takeUntil(this.clearPage$)
      )
      .subscribe(([id, paramType]) => {
        this.providedCostType = this.costTypes.find(
          (costType) => costType.type == paramType
        );
        this.tripId = parseInt(id);
        this.trip$ = this.store.select(selectTripById(parseInt(id)));

        this.trip$.subscribe((trip) => {
          console.log('bbb', trip);
          this.costForm.controls.currency?.patchValue(trip?.currency);
        });
      });
  }
  public getDate(e: any) {
    const date = new Date(e.target.value).toISOString();
    this.costForm.get('date')!.setValue(date, {
      onlyself: true,
    });
  }

  public fetchExchangeRate(e: any, to: currency | undefined) {
    const costCurrency: currency = e.target.value;
    if (costCurrency && to != undefined && to.code !== costCurrency.code) {
      this.exchangeRateLoading = true;
      this.exchangeRateService
        .getExchangeRate(costCurrency.code, to.code)
        .pipe(takeUntil(this.clearPage$))
        .subscribe(
          (data: any) => {
            this.exchangeRate = data.result;
            this.exchangeRateLoading = false;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  public submit() {
    const cost: cost = {
      costId: this.newCostId,
      tripId: this.tripId,
      type: this.costForm.get('type')?.value!,
      amount: this.costForm.get('amount')?.value!,
      currency: this.costForm.get('currency')?.value!,
      exchangeRate: this.exchangeRate,
      date: this.costForm.get('date')?.value!,
    };
    this.store.dispatch(costActions.addCost({ cost }));
    this.navController.navigateForward(
      `/application/trips/${this.tripId}/details`
    );
  }

  public clearPage(): void {
    this.clearPage$.next();
    this.clearPage$.complete();
  }
}
