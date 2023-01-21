import { createFeature, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { currency } from "src/app/shared/interfaces/currency.interface";
import { CurrencyState } from "src/app/shared/interfaces/storeStates/currencyState.interface";
import * as currencyActions from "./currency.actions";


export const currencyAdapter: EntityAdapter<currency> = createEntityAdapter<currency>({
  selectId: entity=>entity.code, 
});

export const currenciesInitialState: CurrencyState = currencyAdapter.getInitialState({});
  
export const currencyFeature = createFeature({
  name: "currency",
  reducer: createReducer(currenciesInitialState,  
    on(currencyActions.loadCurrencyStateSuccess, (state, { currency }) => {
      return currencyAdapter.setAll(currency, state)
    })
  ),
})