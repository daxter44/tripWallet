import { createAction, props } from "@ngrx/store";
import { cost } from "src/app/shared/interfaces/cost.interface";

export const setCostState = createAction('[Cost Store] Set Cost', props<{ cost: cost }>());
export const clearCostState = createAction('[Cost Store] Clear Cost');

export const addCost = createAction(
    '[Cost Store] Add cost',
    props<{ cost: cost}>()
  );

export const removeCost = createAction(
  '[Cost Store] Remove cost',
  props<{ costId: number}>()
);


export const loadCostState = createAction('[Cost Store] Load data into cost');
export const loadCostStateSuccess = createAction('[Cost Store] Load data into cost success', props<{ cost: cost[] }>());
export const loadCostStateFailure = createAction('[Cost Store] Load data into cost failure', props<{ error: any }>());


export const saveCostState = createAction('[Cost Store] Save cost data');
export const saveCostStateSuccess = createAction('[Cost Store] Save cost data');
export const saveCostStateFailure = createAction('[Cost Store] Save cost data', props<{ error: any }>());