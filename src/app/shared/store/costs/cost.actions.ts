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