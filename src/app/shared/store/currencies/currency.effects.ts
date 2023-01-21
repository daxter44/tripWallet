import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import * as CurrencyActions from './currency.actions';
import { StorageService } from '../../services/storage.service';
import { Store } from '@ngrx/store';
import { currency } from 'src/app/shared/interfaces/currency.interface';
import { CostState } from '../../interfaces/storeStates/costState.interface';
import { cost } from '../../interfaces/cost.interface';
import { ExchangeRateService } from '../../services/exchangeRate.service';
import { of } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class CurrencyEffects {
  constructor(
    private actions: Actions,
    private store: Store<CostState>,
    private exchangeRateService: ExchangeRateService,
    private toastService: ToastService
  ) {}

  loadData = createEffect(() => {
    return this.actions.pipe(
      ofType(CurrencyActions.loadCurrencyState),
      mergeMap(() => {
        return this.exchangeRateService.getCurrencies().pipe(
          map(
            (cost: any) => {
              let currency: currency[] = [];
              for (let key in cost.symbols) {
                if (cost.symbols.hasOwnProperty(key)) {
                  const { description, code }: currency = cost.symbols[key];
                  currency.push({ description, code });
                }
              }
              return CurrencyActions.loadCurrencyStateSuccess({ currency });
            },
            catchError((err) => {
              this.toastService.showOfflineToast();
              return of(
                CurrencyActions.loadCurrencyStateFailure({
                  error: err.error.message,
                })
              );
            })
          )
        );
      })
    );
  });
}
