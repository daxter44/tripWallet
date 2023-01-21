import { createAction, props } from "@ngrx/store";
import { currency } from "src/app/shared/interfaces/currency.interface";

export const loadCurrencyState = createAction('[Currency Store] Load data into currency');
export const loadCurrencyStateSuccess = createAction('[Currency Store] Load data into currency success', props<{ currency: currency[] }>());
export const loadCurrencyStateFailure = createAction('[Currency Store] Load data into currency failure', props<{ error: any }>());
