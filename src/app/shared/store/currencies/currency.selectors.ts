import { createSelector } from "@ngrx/store";
import { currencyAdapter, currencyFeature } from "./currency.reducer";

export const { selectCurrencyState } = currencyFeature;
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = currencyAdapter.getSelectors();


export const selectAllCurrencies = createSelector(selectCurrencyState, selectAll);
